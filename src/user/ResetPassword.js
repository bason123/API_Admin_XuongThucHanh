import React , {useState, useEffect} from "react";
import AxiosInstance from "../helper/AxiosInstance";
import {useParams} from "react-router-dom";
import swal from "sweetalert";

const ResetPassword = () =>{
    const {token} = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [success, setSuccess] = useState(false);

    const hanlderPassword = async () =>{
        if(password.trim().length && confirmPassword.trim().length){
        if (password == confirmPassword) {
            // Thực hiện các thao tác cập nhật mật khẩu ở đây
            try {
                await AxiosInstance().post('/users/resetpassword', {token, password});
                console.log("Password updated successfully!");
                swal({
                    title:"Thành công!",
                    text:"Bạn đã thành công",
                    icon:"success",
                    button:"Aww yiss!",
                });
            } catch (error) {
                console.log("error: ", error);
            }
            
        } else {
            console.log("Nhập mật khẩu không trùng nhau!");
        }
    }else{
        console.log("Không được để trống!")
    }
}

    useEffect(() =>{
        const check = async () =>{
           const result = await AxiosInstance().post('/users/check-token-reset-password', {token});
           setSuccess(result.status);
        }
        check();
    }, [token]);
    if(success == false){
        return (<div>Link không hợp lệ</div>)
    }else{
        return(
            <div>
                <div className="form-group">
                    <label>Mật khẩu</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Nhập lại mật khẩu</label>
                    <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
                <button className="btn btn-primary" onClick={hanlderPassword}>Đổi mật khẩu</button>
            </div>
        )
    }
}

export default ResetPassword;