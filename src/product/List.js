import React, {useState, useEffect} from "react";
import AxiosInstance from '../helper/AxiosInstance';
import swal from "sweetalert";

// import '../css/materialdesignicons.min.css';
import '../css/style.css';
import '../css/vendor.bundle.base.css';

const List = (props) => {
    const {setUser} = props;
  const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const result = await AxiosInstance().get('/news');
                setProducts(result);
            } catch (error) {
                console.log(error);
            }
        }
        getProducts();
    }, []);

    const logout = () => setUser(null);

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
                    const result = await AxiosInstance().delete(`/news/${id}`);
                    if(result.status){
                        swal({
                            title: "Thành công!",
                            text: "Bạn đã thành công xóa sản phẩm",
                            icon: "success",
                            button: "Aww yiss",
                        });
                        setTimeout(() =>{
                            window.location.href = '/';
                        }, 2000);
                        }
                }catch(error){
                    console.log(error);
                    swal('Xóa thất bại');
                }
            }
         })
    }

    return (
        <div>
            {/* <h1>List</h1>
            <button type="button" onClick={logout}>Đăng xuất</button>
            <a href="/add" className="btn btn-primary">Thêm sản phẩm</a>
            <a href="/listCategory" className="btn btn-primary">Hiển thị danh sách category</a>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Ảnh</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>
                                    <img src={product.image} alt={product.name} width="100" />
                                </td>
                                <td>
                                    <a className={'btn btn-primary'} href={`/edit/${product._id}`}>Sửa</a>
                                    <button onClick={()=> handleDelete(`${product._id}`)} type="button">Xóa</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table> */}
            <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Striped Table</h4>
                        <p className="card-description"> Add class <code>.table-striped</code></p>
                        <table>
                            <thead>
                                <tr>
                                    <th><a href="/add" className="btn btn-primary">Thêm Tin Tức</a></th>
                                    <th><a href="/listCategory" className="btn btn-primary">Xem Danh Mục</a></th>
                                    <th><button onClick={logout} type="button" className="btn btn-primary">Đăng xuất</button></th>
                                </tr>
                            </thead>
                        </table>
                        <table className="table table-striped">
                        
                        <thead>
                            <tr>
                            <th>STT</th>
                            <th> User </th>
                            <th> Title </th>
                            <th> Content </th>
                            <th> Update </th>
                            <th> Delete </th>
                            </tr>
                        </thead>
                        <tbody>

                        {/* {
                        products.map((product, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>
                                    <img src={product.image} alt={product.name} width="100" />
                                </td>
                                <td>
                                    <a className={'btn btn-primary'} href={`/edit/${product._id}`}>Sửa</a>
                                    <button onClick={()=> handleDelete(`${product._id}`)} type="button">Xóa</button>
                                </td>
                            </tr>
                        ))
                    } */}
                    {
                        products.map((product, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td class="py-1">
                                    <img src={product.image} alt="image" />
                                </td>
                                <td> {product.title.split(' ').slice(0, 3).join(' ') + "..."} </td>
                                <td>
                                 {product.content.split(' ').slice(0, 15).join(' ') + "..."}
                                </td>
                                <td><a className={'btn btn-primary'} href={`/edit/${product._id}`}>Sửa</a> </td>
                                <td> <button onClick={()=> handleDelete(`${product._id}`)} type="button" class="btn btn-primary">Delete</button> </td>
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
};

export default List;