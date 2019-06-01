import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { interval } from 'rxjs/observable/interval';
import { switchMap } from 'rxjs/operators';

import { Skripsi } from '../../Skripsi';
import { Dokumen } from '../../Dokumen';
import { Dosen } from '../../Dosen';
import { Notifikasi } from '../../Notifikasi';
import { Pengumuman } from '../../Pengumuman';
import { Jadwal_kuliah } from '../../Jadwal_kuliah';
import { Jadwal_ujian } from '../../Jadwal_ujian';
import { Materi } from '../../Materi';
import { Pertemuan } from '../../Pertemuan';
import { Tugas } from '../../Tugas';
import { Pertemuan_tugas } from '../../Pertemuan_tugas';
import { Users } from "../../Users";
import { Dosendetail } from '../../dosendetail';


@Injectable()
export class RestProvider {

  apiUrl: any;

  constructor(private http: HttpClient) {
    //this.apiUrl = 'http://Restdsf.ryansurjadi.com/';
    this.apiUrl = 'http://localhost/RestAPI/';
  }

  Auth(input1, input2): Observable<Users[]> {
    return this.http
      .get<Users[]>(this.apiUrl + "Auth", {
        params: {
          email: input1,
          password: input2
        }
      });
  }

  getSkripsi(): Observable<Skripsi[]> {
    return this.http
      .get<Skripsi[]>(this.apiUrl + "Skripsi")
  }

  getDokumen(): Observable<Dokumen[]> {
    return this.http
      .get<Dokumen[]>(this.apiUrl + "Dokumen")
  }

  getDokumenDetail(id): Observable<Dokumen[]> {
    return this.http
      .get<Dokumen[]>(this.apiUrl + 'Dokumen', {
        params: {
          Id_dokumen: id
        }
      });
  }

  getDosen(): Observable<Dosen[]> {
    return this.http
      .get<Dosen[]>(this.apiUrl + 'Dosen');
  }

  getJadwalDosen(id): Observable<Dosendetail[]> {
    return this.http
      .get<Dosendetail[]>(this.apiUrl + 'Dosen', {
        params: {
          Nid: id
        }
      });
  }

  getPengumuman(): Observable<Pengumuman[]> {
    return this.http
      .get<Pengumuman[]>(this.apiUrl + 'Pengumuman');
  }

  getPengumumanDetail(id): Observable<Pengumuman[]> {
    return this.http
      .get<Pengumuman[]>(this.apiUrl + 'Pengumuman', {
        params: {
          Id_informasi: id
        }
      });
  }

  // getChangePengumuman(): Observable<Pengumuman[]> {
  //   return interval(30000).pipe(
  //     switchMap(
  //       () => this.http.get<Pengumuman[]>(this.apiUrl + 'Pengumuman', { params: { UUID: id } })
  //     ))
  // }

  getJadwalkuliah(id): Observable<Jadwal_kuliah[]> {
    return this.http
      .get<Jadwal_kuliah[]>(this.apiUrl + 'JadwalKuliah', {
        params: {
          NIM: id
        }
      });
  }

  getJadwalujian(id): Observable<Jadwal_ujian[]> {
    return this.http
      .get<Jadwal_ujian[]>(this.apiUrl + 'JadwalUjian', {
        params: {
          NIM: id
        }
      });
  }

  getMateri(id): Observable<Materi[]> {
    return this.http
      .get<Materi[]>(this.apiUrl + 'Materi', {
        params: {
          NIM: id
        }
      });
  }

  getPertemuan(id): Observable<Pertemuan[]> {
    return this.http
      .get<Pertemuan[]>(this.apiUrl + 'Materi', {
        params: {
          Id_kelas: id
        }
      });
  }

  getTugas(id): Observable<Tugas[]> {
    return this.http
      .get<Tugas[]>(this.apiUrl + 'Tugas', {
        params: {
          NIM: id
        }
      });
  }

  getPertemuanTugas(id): Observable<Pertemuan_tugas[]> {
    return this.http
      .get<Pertemuan_tugas[]>(this.apiUrl + 'Tugas', {
        params: {
          Id_kelas: id
        }
      });
  }

  getNotifikasi(id): Observable<Notifikasi[]> {
    return this.http
      .get<Notifikasi[]>(this.apiUrl + 'Notifikasi', {
        params: {
          UUID: id
        }
      });
  }

  getChangeNotifikasi(id): Observable<Notifikasi[]> {
    return interval(30000).pipe(
      switchMap(
        () => this.http.get<Notifikasi[]>(this.apiUrl + 'Notifikasi', { params: { UUID: id } })
      ))
  }

  getUserProfil(id, level) {
    return this.http.get(this.apiUrl + 'Profil', {
      params: {
        UUID: id,
        Level: level
      }
    });
  }

  postFotoProfil(data) {
    return this.http.post(this.apiUrl + 'Profil', data);
  }

  postPassword(data) {
    return this.http.post(this.apiUrl + 'Auth', data);
  }

}


