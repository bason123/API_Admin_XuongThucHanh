import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import AxiosInstance from '../helper/AxiosInstance';

const Add = (props) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [category_id, setCategory_id] = useState('');

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
            title: title,
            content: content,
            image: image,
            category_id: category_id
        }
        try {
            const result = await AxiosInstance().post('/news', data);
            // hiển thị thông báo thành công
            swal({
                title:"Thành công!",
                text:"Bạn đã thành công",
                icon:"success",
                button:"Aww yiss!",
            });
            //chuyển về trang danh sách sản phẩm
            setTimeout(() => {
                window.location.href='/';
            }, 1000);
        } catch (error) {
            alert('Thêm thất bại')
        }
                }
            });
        
    }

    // lấy danh sách category
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const getCategories = async () => {
            try {
                const result = await AxiosInstance().get('/categories');
                setCategories(result);
                // lấy id đầu tiên của category
                setCategory_id(result[0]._id);
            } catch (error) {
                console.log(error);
            }
        }
        getCategories();
    }, []);

    // xử lý hình ảnh
    //   const [imageInput, setImageInput] = useState();
      const [imageReview, setImageReview] = useState('');
      // khi chọn hình thì hiển thị thẻ image
      const handleImage = async (e)=>{
        const file = e.target.files[0];
        setImageReview(URL.createObjectURL(file));
        // upload hình lên server lấy url
        const formData = new FormData();
        formData.append('image', file);
        const result = await AxiosInstance('multipart/form-data').post('/upload-file', formData);
        setImage(result.path);
      }
    return (
        <div>
            <form>
                <div className="mb-3 mt-3">
                    <label className="form-label">Tiêu đề:</label>
                    <input type='text' value={title} className="form-control"
                        onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Nội dung:</label>
                    <input type='text' value={content} className="form-control"
                        onChange={(e) => setContent(e.target.value)} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Hình ảnh:</label>
                    <input type='file' className="form-control"
                        onChange={(e) => handleImage(e) }/>
                        <img className="mb-3 mt-3" src={imageReview} alt={imageReview} width="500"/>
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Danh mục:</label>                   
                    <select value={category_id} className="form-control"
                        onChange={(e) => setCategory_id(e.target.value)}>
                        {
                            categories.map((category, index) => (
                                <option key={index} value={category._id}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>
                <button type='button' className="btn btn-primary" onClick={handleAdd}>Add</button>
            </form>
        </div>
    );
}

export default Add;