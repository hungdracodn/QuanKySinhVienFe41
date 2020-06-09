 loadDanhSachSinhVien = function(){

    var objectAjax = {
        url: 'http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien',
        method: 'GET',
        responseType: 'json'
    }
    var promise = axios(objectAjax);
    promise.then(function (res) {
        var noiDungTable = '';
        for (var i = 0; i < res.data.length; i++) {
            var SinhVien = res.data[i];
            noiDungTable += `
            <tr>
            <td>${SinhVien.MaSV}</td>
            <td>${SinhVien.HoTen}</td>
            <td>${SinhVien.Email}</td>
            <td>${SinhVien.SoDT}</td>
            <td>${SinhVien.CMND}</td>
            <td>${SinhVien.DiemToan}</td>
            <td>${SinhVien.DiemLy}</td>
            <td>${SinhVien.DiemHoa}</td>
            <td>
            <button class = "btn btn-danger" onclick="xoaSinhVien('${SinhVien.MaSV}')">Xóa</button>
            <button class = "btn btn-primary" onclick="chinhSua('${SinhVien.MaSV}')">Sua</button>
            </td>
            </tr>
            `
        }
        document.getElementById('tblSinhVien').innerHTML = noiDungTable;
        // console.log(res.data);
    }).catch(function (error) {
        console.log(error);
    })
}
// xu ly chuc nang cap nhat sinh vien 
document.getElementById('btnCapNhatSinhVien').onclick = function () {
    var sv = new sinhVien();
    sv.MaSV = document.getElementById('maSV').value;
    sv.HoTen = document.getElementById('tenSV').value;
    sv.Email = document.getElementById('email').value;
    sv.SoDT = document.getElementById('soDT').value;
    sv.CMND = document.getElementById('soCMND').value;
    sv.DiemToan = document.getElementById('diemToan').value;
    sv.DiemLy = document.getElementById('diemLy').value;
    sv.DiemHoa = document.getElementById('diemHoa').value;
    console.log(sv);
    // goi api cap nhat du lieu backend cung cap 
    axios({
        url: 'http://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien',
        method: 'put',
        data: sv
    }).then(function (res) {
        console.log(res.data);
        loadDanhSachSinhVien();
    }).catch(function (err) {
        console.log(err);

    })
}


var chinhSua = function (maSV) {
    axios({
        url: `http://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/${maSV}`,
        // duong dan den backend 
        method: 'get'
    }).then(function (res) {
        var sinhVien = res.data;
        // lay thong tin sinh vien da tra ve dua vao bang 

        document.getElementById('maSV').value = sinhVien.MaSV;
        document.getElementById('tenSV').value = sinhVien.HoTen;
        document.getElementById('email').value = sinhVien.Email;
        document.getElementById('soDT').value = sinhVien.SoDT;
        document.getElementById('soCMND').value = sinhVien.CMND;
        document.getElementById('diemToan').value = sinhVien.DiemToan;
        document.getElementById('diemLy').value = sinhVien.DiemLy;
        document.getElementById('diemHoa').value = sinhVien.DiemHoa;
    }).catch(function (err) {
        console.log(err.response.data);

    })
}

var xoaSinhVien = function (MaSV) {
    var obAjaxXoaSinhVien = {
        url: `http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/${MaSV}`,
        method: 'DELETE'
    }
    // goi API xóa sinh viên 
    axios(obAjaxXoaSinhVien).then(function (res) {
        console.log(res);
        window.location.reload()
    }).catch(function (err) {
        console.log(err.response.data);
        window.location.reload()
    })
}

document.getElementById('btnThemSinhVien').onclick = function () {
    var sv = new sinhVien();
    sv.MaSV = document.getElementById('maSV').value;
    sv.HoTen = document.getElementById('tenSV').value;
    sv.Email = document.getElementById('email').value;
    sv.SoDT = document.getElementById('soDT').value;
    sv.CMND = document.getElementById('soCMND').value;
    sv.DiemToan = document.getElementById('diemToan').value;
    sv.DiemLy = document.getElementById('diemLy').value;
    sv.DiemHoa = document.getElementById('diemHoa').value;

    // tạo object dua du lieu ve backend 
    var objectAjax = {
        url: 'http://svcy.myclass.vn/api/SinhVien/ThemSinhVien',
        method: 'POST',
        data: sv  // sv là dữ liệu đưa về backend xử lý vì vậy cần phải ghi đúng chính xác
        // tên các thuộc tính backend yêu cầu
    }
    // dùng axios đưa dữ liệu về backend 
    axios(objectAjax).then(function (res) {
        console.log(res);
        // gọi lại phương thức danh sách sinh viên mới từ server về 
        window.location.reload()
    }).catch(function (err) {
        console.log(err.response.data);
        window.location.reload()
    })
}