import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import AxiosInstance from '../helper/AxiosInstance';

const AddCategory = (props) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    
    const handleAdd = async () => {
        swal({
            title: "Xác nhận thêm mới?",
            text: "Thêm mới sản phẩm vào hệ thống!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then( async (willDelete) => {
                if (willDelete) {
                    // gọi api thêm mới sản phẩm 
        const data = {
            name: name,
            description: description,
        }
        try {
           await AxiosInstance().post('/categories', data);
            // hiển thị thông báo thành công
            swal({
                title:"Thành công!",
                text:"Bạn đã thành công",
                icon:"success",
                button:"Aww yiss!",
            });
            //chuyển về trang danh sách sản phẩm
            setTimeout(() => {
                window.location.href='/listCategory';
            }, 1000);
        } catch (error) {
            alert('Thêm thất bại')
        }
                }
            });
        
    }
    return (
        <div>
            <form>
                <div className="mb-3 mt-3">
                    <label className="form-label">Tên danh lục:</label>
                    <input type='text' value={name} className="form-control"
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Mô tả:</label>
                    <textarea value={description} className="form-control"
                        rows={10}
                        onChange={(e) => setDescription(e.target.value)} ></textarea>
                </div>
                <button type='button' className="btn btn-primary" onClick={handleAdd}>Add</button>
            </form>
        </div>
    );
}

export default AddCategory;