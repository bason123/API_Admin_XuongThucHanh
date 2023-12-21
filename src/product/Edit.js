import React , {useState, useEffect} from "react";
import AxiosInstance from '../helper/AxiosInstance';
import { useParams } from "react-router-dom";
import swal from "sweetalert";

const Edit = (props) => {
    const {id} = useParams();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [category_id, setCategory_id] = useState('');

    // console.log("ahihi", id);
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
            title: title,
            content: content,
            image: image,
            category_id: category_id
        }
        try {
             await AxiosInstance().put(`/news/${id}`, data);
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
            alert('Cập nhập thất bại')
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

    // lấy thông tin chi tiết sản phẩm
    useEffect(() => {
        const getProducts = async () => {
            try {
                const result = await AxiosInstance().get(`/news/${id}`);
                // console.log(result)
                setTitle(result.data.title);
                setContent(result.data.content);
                setImage(result.data.image);
                setCategory_id(result.data.category_id);

                setImageReview(result.image);
            } catch (error) {
                console.log(error);
            }
        }
        getProducts();
    }, []);

    return(
        <div>
            <form>
                <div className="mb-3 mt-3">
                    <label className="form-label">Tiêu đề :</label>
                    <input type='text' value={title.split(' ').slice(0, 10).join(' ') + "..."} className="form-control"
                        onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Nội dung:</label>
                    <input type='text' value={content.split(' ').slice(0, 25).join(' ') + "..."} className="form-control"
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
                <button type='button' className="btn btn-primary" onClick={() => handleEdit(`${id}`)}>Update</button>
            </form>
        </div>
    )
}

export default Edit;