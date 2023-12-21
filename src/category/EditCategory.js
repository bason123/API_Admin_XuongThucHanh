import React , {useState, useEffect} from "react";
import AxiosInstance from '../helper/AxiosInstance';
import { useParams } from "react-router-dom";
import swal from "sweetalert";

const EditCategory = (props) => {
    const {id} = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');


    const handleEdit =  async (id) =>{
        
        swal({
            title: "Xác nhận cập nhập?",
            text: "Cập nhập sản phẩm vào hệ thống!",
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
             await AxiosInstance().put(`/categories/${id}`, data);
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
            alert('Cập nhập thất bại')
        }
                }
            });
    }


    // lấy thông tin chi tiết sản phẩm
    useEffect(() => {
        const getCategories = async () => {
            try {
                const result = await AxiosInstance().get(`/categories/${id}`);
                setName(result.name);
                setDescription(result.description);
            } catch (error) {
                console.log(error);
            }
        }
        getCategories();
    }, []);

    return(
        <div>
            <h1>ListCategory</h1>
            <form>
                <div className="mb-3 mt-3">
                    <label className="form-label">Tên danh mục:</label>
                    <input type='text' value={name} className="form-control"
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Mô tả:</label>
                    <textarea value={description} className="form-control"
                        rows={10}
                        onChange={(e) => setDescription(e.target.value)} ></textarea>
                </div>
                <button type='button' className="btn btn-primary" onClick={() => handleEdit(`${id}`)}>Edit</button>
            </form>
        </div>
    )
}

export default EditCategory;