<?php

namespace App\Utils;


class FileUtil {

    public static function getcwd() { return getcwd(); }

    public static function read(string $filepath, bool $binary = false) {
        if (!file_exists($filepath)) return null;
        $file = fopen($filepath, $binary ? 'rb' : 'r');
        $data = fread($file, filesize($filepath));
        fclose($file);
        return $data;
    }

    public static function write($filepath, $data, bool $binary = false) {
        $file = fopen($filepath, $binary ? 'wb' : 'w');
        fwrite($file, $data);
        fclose($file);
    }

    public static function store(Array $files) {
        foreach($files as $f) {
            $filepath = join(DIRECTORY_SEPARATOR, [storage_path(), $f['path'], $f['name']]);
            $data = base64_decode(explode(',', $f['data'])[1]);
            FileUtil::write($filepath, $data);
        }
    }

    public static function delete(Array $files) {
        foreach($files as $f) {
            unlink(join(DIRECTORY_SEPARATOR, [storage_path(), $f['path'], $f['name']]));
        }
    }
}