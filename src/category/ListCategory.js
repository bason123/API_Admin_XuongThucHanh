import React, {useState, useEffect} from "react"
import AxiosInstance from "../helper/AxiosInstance"
import swal from "sweetalert"

const ListCategory = () =>{
    const handleDelete = async (id) => {
        swal({
            title: "Xác nhận xóa?",
            text:"Bạn có chắc chắn muốn xóa sản phẩm này?",
            icon:"warning",
            buttons:true,
            dangerMode: true,
        })
         .then(async (willDelete) =>{
            if(willDelete) {
                try{
                    const result = await AxiosInstance().delete(`/categories/${id}`);
                    if(result.status){
                        swal({
                            title: "Thành công!",
                            text: "Bạn đã thành công xóa sản phẩm",
                            icon: "success",
                            button: "Aww yiss",
                        });
                        setTimeout(() =>{
                            window.location.reload();
                        }, 2000);
                        }
                }catch(error){
                    console.log(error);
                    swal('Xóa thất bại');
                }
            }
         })
    }
    const [categorys,setCategory] = useState([]);

    useEffect (() =>{
        const getCategory = async () =>{
            try {
                const result = await AxiosInstance().get('/categories');
                setCategory(result);
            } catch (error) {
                console.log(error);
            }
        }
        getCategory();
    },[])
    return (
    <div>
        <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Striped Table</h4>
                        <p className="card-description"> Add class <code>.table-striped</code></p>
                        <table>
                            <thead>
                                <tr>
                                    <th><a href="/AddCategory" className="btn btn-primary">Thêm Danh mục</a></th>
                                </tr>
                            </thead>
                        </table>
                        <table className="table table-striped">
                        
                        <thead>
                            <tr>
                            <th>STT</th>
                            <th> Name </th>
                            <th> Description </th>
                            </tr>
                        </thead>
                        <tbody>
                {
                    categorys.map((category, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                {/* <td class="py-1">
                                    <img src={product.image} alt="image" />
                                </td> */}
                                <td> {category.name} </td>
                                <td>
                                 {category.description.split(' ').slice(0, 15).join(' ') + "..."}
                                </td>
                                <td><a className={'btn btn-primary'} href={`/editCategory/${category._id}`}>Sửa</a> </td>
                                <td> <button onClick={()=> handleDelete(`${category._id}`)} type="button" class="btn btn-primary">Delete</button> </td>
                            </tr>
                            ))
                        }
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
    </div>
    );
}

export default ListCategory;