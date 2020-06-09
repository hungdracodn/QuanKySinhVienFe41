var objectAjax = {
    url: '../data/DanhSachNguoiDung.json', //Đường dẫn file chứa dữ liệu hoặc api backend 
    method: 'GET',// giao thức backend cung cap ứng với url
    responseType: 'json' // định dạng dữ liệu trả về từ server
}

// dùng thư viện axios để đọc file hoặc api từ backend
var promise = axios(objectAjax);
promise.then(function (res) {
    var noiDungTable = '';
    for(var i = 0;i < res.data.length;i++){
        // sau mỗi lần lặp lấy ra 1 đối tượng người dùng 
        var nguoiDung = res.data[i];
        // từ đối tượng người dùng tạo ra thẻ tr tương ứng 
        noiDungTable += `
        <tr>
        <td>${nguoiDung.TaiKhoan}</td>
        <td>${nguoiDung.MatKhau}</td>
        <td>${nguoiDung.HoTen}</td>
        <td>${nguoiDung.Email}</td>
        <td>${nguoiDung.SoDT}</td>
        </tr>
        `
    } 
    document.getElementById('tblNguoiDung').innerHTML = noiDungTable

}).catch(function (error) {
    //ham xử lý khi request thất bại
    console.log(error);

});