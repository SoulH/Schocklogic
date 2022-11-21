<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Data\UnitOfWork;
use Carbon\Carbon;


class EventController extends Controller
{
    private UnitOfWork $uow;

    function __construct(UnitOfWork $uow) {
        $this->uow = $uow;
    }

    public function index(Request $request) {
        $url_base = $request->getSchemeAndHttpHost();
        $li = $this->uow->events->list();
        $res = $li->map(function($e) use($url_base) {
            $o = $e->toArray();
            $o['files'] = $e->files->map(function($e) use($url_base) {
                return "$url_base/api/v1/files/$e->file_id";
            })->toArray();
            return $o;
        });
        return response()->json($res, 200);
    }

    public function create(Request $request) {
        $request->validate([
            'name' => 'required|string|max:100'
        ]);
        $url_base = $request->getSchemeAndHttpHost();
        $e = $this->uow->events->merge($request->all());
        $res = $e->toArray();
        $res['files'] = $e->files->map(function($e) use($url_base) {
            return "$url_base/api/v1/files/$e->file_id";
        })->toArray();
        return response()->json($res, 201);
    }

    public function update(Request $request) {
        $url_base = $request->getSchemeAndHttpHost();
        $e = $this->uow->events->merge($request->all());
        $res = $e->toArray();
        $res['files'] = $e->files->map(function($e) use($url_base) {
            return "$url_base/api/v1/files/$e->file_id";
        })->toArray();
        return response()->json($res, 202);
    }

    public function delete(Request $request, int $event_id) {
        $err = $this->uow->events->delete($event_id);
        return $err ? response()->json(['detail' => $err], 400) : response('', 202);
    }

    public function getParticipants(Request $request, int $event_id) {
        $res = $this->uow->events->getParticipants($event_id);
        return response()->json($res, 200);
    }

    public function revokeParticipants(Request $request, int $event_id) {
        [$li, $err] = $this->uow->events->revokeParticipants($event_id, $request->all());
        return empty($err) ? response('', 202) : response()->json(['detail' => $err], 400);
    }

    public function subscriptionMetrics(Request $request, int $event_id) {
        $rules = [
            'start' => 'nullable|date',
            'end' => 'nullable|date',
            'unit' => 'required|string',
        ];
        $request->validate($rules);
        $start = $request->get('start') ? Carbon::parse($request->get('start')) : null;
        $end = $request->get('end') ? Carbon::parse($request->get('end')) : null;
        [$li, $err] = $this->uow->events->subscriptionMetrics($event_id, $start, $end, $request->get('unit'));
        return empty($err) ? response()->json($li, 200) : response()->json(['detail' => $err], 400);
    }
}
