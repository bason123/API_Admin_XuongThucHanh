import React, { useState, useEffect } from "react"
import AxiosInstance from "../helper/AxiosInstance";
import { useParams } from "react-router-dom";
import bcrypt from 'bcryptjs';
import swal from "sweetalert";

const ForgetPassWord = (props) =>{
    const {id} = useParams();
    const [PasswordNew, setPasswordNew] = useState('');
    const [RetypePassword, setRetypePassword] = useState('');

    const hanlderPassword = async (id) =>{
        console.log('nguyen ba son', id);
        if(PasswordNew.trim() === ' ' && RetypePassword.trim() === ' '){
        if (PasswordNew == RetypePassword) {
            // Thực hiện các thao tác cập nhật mật khẩu ở đây
            try {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(PasswordNew, salt);
                const data = {
                    password: hash
                }
                await AxiosInstance().put(`/users/changedPassword/${id}`, data);
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

    return (
            <div>
                <form>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Password New :</label>
                        <input type="password" value={PasswordNew} onChange={(e) => setPasswordNew(e.target.value)} className="form-control" placeholder="password new"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Retype Password:</label>
                        <input type="password" value={RetypePassword} onChange={(e) => setRetypePassword(e.target.value)} className="form-control" placeholder="retype password"/>
                    </div>
                    <button type="button" onClick={() => hanlderPassword(`${id}`)} className="btn btn-primary">Submit</button>
                </form>
            </div>
    )
}

export default ForgetPassWord;