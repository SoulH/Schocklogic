<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Data\UnitOfWork;
use \App\Utils\FileUtil;


class FileController extends Controller
{
    private $uow;

    function __construct(UnitOfWork $uow) {
        $this->uow = $uow;
    }

    public function index($key) {
        $info = is_numeric($key) ? $this->uow->files->query()->find($key)
        : $this->uow->files->query()->where('name', $key);
        if (empty($info))
            return response('', 404);
        $headers = [
            'Content-Type' => $info->mime,
            'Content-Disposition' => "attachment; filename=$info->name"
        ];
        $filepath = join(DIRECTORY_SEPARATOR, [storage_path(), $info->path, $info->name]);
        $file = FileUtil::read($filepath);
        return response($file, 200, $headers);
    }
}
