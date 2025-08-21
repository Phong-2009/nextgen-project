// Lấy link API
const API_URL = 'https://689dcab6ce755fe6978a02ea.mockapi.io/api/v1/KhoaHoc';

// Lấy các phần tử HTML 
const khTableBody = document.getElementById('productsTableBody');
const khForm = document.getElementById('productForm');
const khIdInput = document.getElementById('productId');
const khNameInput = document.getElementById('productName');
const khPriceInput = document.getElementById('productPrice');
const ngayBDInput = document.getElementById('ngayBD');
const ngayKTInput = document.getElementById('ngayKT');
const submitBtn = document.getElementById('submitBtn');

// Hàm để lấy và hiển thị tất cả khóa học (READ)
const fetchKH = async () => {
    try {
        const response = await fetch(API_URL);
        const kh = await response.json();

        khTableBody.innerHTML = ''; // Xóa dữ liệu cũ
        kh.forEach(k => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${k.id}</td>
                <td>${k.TenKhoaHoc}</td>
                <td>${k.Gia}</td>
                <td>${k.NgayBatDau}</td>
                <td>${k.NgayKetThuc}</td>
                <td class="actions">
                    <button class="btn btn-primary edit" onclick="editKH(${k.id}, '${k.TenKhoaHoc}', ${k.Gia}, '${k.NgayBatDau}', '${k.NgayKetThuc}')">Edit</button>
                    <button class="btn btn-danger delete" onclick="deleteKH(${k.id})">Delete</button>
                </td>
            `;
            khTableBody.appendChild(row)
        })

        
    } catch (e) {
        console.log("Lỗi khi lấy dữ liệu: ", e)
    }
}

// Hàm thêm hoặc cập nhậtb sản phẩm (CREATE & UPDATE)
khForm.addEventListener('submit', async (e) => {
    e.preventDefault() 

    const id = khIdInput.value;
    const TenKhoaHoc = khNameInput.value;
    const Gia = khPriceInput.value;
    const NgayBatDau = ngayBDInput.value;
    const NgayKetThuc = ngayKTInput.value;

    const newKH = { TenKhoaHoc, Gia, NgayBatDau, NgayKetThuc }

    if (id) { // Nếu có ID, thì thực hiện thao tác UPDATE (PUT)
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newKH),
        });
    } else { // Nếu không có ID, thì thực hiện thao tác CREATE
        await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newKH),
        });
    }

    // Xóa form và tải lại bảng dữ liệu
    khForm.reset();
    khIdInput.value = '';
    submitBtn.textContent = 'Add Courses';
    fetchKH();
})

// Hàm điền dữ liệu vào form khi nhấn nút "Sửa"
const editKH = (id, TenKhoaHoc, Gia, NgayBatDau, NgayKetThuc) => {
    khIdInput.value = id
    khNameInput.value = TenKhoaHoc;
    khPriceInput.value = Gia;

    // chuyển đổi định dạng ngày tháng
    ngayBDInput.value = NgayBatDau ? NgayBatDau.split('T')[0] : '';
    ngayKTInput.value = NgayKetThuc ? NgayKetThuc.split('T')[0] : '';

    submitBtn.textContent = 'Update course';
}

// Hàm xóa khóa học (DELETE)
const deleteKH = async (id) => {
    if (confirm('Are you sure you want to delete this course?')) {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        fetchKH();
    }
}

// Gọi hàm fetch
document.addEventListener('DOMContentLoaded', fetchKH);