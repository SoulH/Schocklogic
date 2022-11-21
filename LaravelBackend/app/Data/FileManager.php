<?php

namespace App\Data;

use \App\Models\File;
use \App\Utils\FileUtil;


class FileManager extends Manager {
    public function query() {
        return File::query();
    }

    public function merge($data) {
        $file = null;
        if (array_key_exists('id', $data)) 
            $file = $this->query()->find($data['id']);
        if (empty($file)) $file = new File();
        $file->fill($data);
        $file->save();
        return $file;
    }

    public function insert(Array $files) {
        $data = collect($files)->map(fn($x) => collect($x)->except('data')->all());
        $names = collect($data)->map(fn($x) => $x['name'])->all();
        File::insert($data->all());
        FileUtil::store($files);
        return $this->query()->WhereIn('name', $names)->get('id')->map(fn($x) => $x->id)->all();
    }

    public function delete(Array $ids) {
        $q = $this->query()->whereIn('id', $ids);
        $del = $q->get()->all();
        $q->delete();
        FileUtil::delete($del);
    }
}