<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Prodi;
use Exception;

class ProdiController extends Controller
{
    public function index(Request $request){
        $prodi = Prodi::latest()->get(); // Gunakan get() saja agar semua tampil di dropdown tanpa paginasi
        return response()->json([
            'status' => true,
            'data' => $prodi
        ], 200);
    }

    public function store(Request $request){
        try{
            $validated = $request->validate([
                'nama_prodi' => 'required'
            ]);
            $prodi = Prodi::create($validated);
            return response()->json([
                'status' => true,
                'message' => 'Berhasil tambah prodi',
                'data' => $prodi
            ]);
        }catch(Exception $err){
            return response()->json([
                'status' => false,
                'message' => 'Gagal nambah prodi',
                'error' => $err->getMessage()
            ], 400);
        }
    }

    public function destroy($id){
        $prodi = Prodi::findOrFail($id);
        $prodi->delete();

        return response()->json([
            'status' => true,
            'message' => 'Berhasil hapus prodi',
            'data' => $prodi
        ], 200);
    }

    public function update(Request $request, $id){
        try{
            $validated = $request->validate([
                'nama_prodi' => 'required'
            ]);
            $prodi = Prodi::findOrFail($id);
            $prodi->update($validated);

            return response()->json([
                'status' => true,
                'message' => 'Berhasil update nama prodi',
                'data' => $prodi
            ]);
        }catch(Exception $err){
            return response()->json([
                'status' => false,
                'message' => 'Gagal update nama prodi',
                'error' => $err->getMessage()
            ], 400);
        }
    }
}
