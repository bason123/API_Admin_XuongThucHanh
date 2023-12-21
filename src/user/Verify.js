import React, { useState, useEffect } from "react"
import AxiosInstance from "../helper/AxiosInstance";
import { useParams } from "react-router-dom";
const Verify = (props) => {
    const { id } = useParams();
    const [result, setResult] = useState(null)

    useEffect(() => {
        const verify = async () => {
            try {
                const res = await AxiosInstance().post(`users/verify/${id}`);

                setTimeout(() => {
                    setResult(res.status);
                }, 3000);
            } catch (error) {
                console.log(error);
            }
        }

        verify();
    }, [id]);

    if (result === null) {
        return (
            <div>
                <h1>Đang xác thực tài khoản...</h1>
            </div>
        )

    } else if (result === false) {
        return (
            <div>
                <h1>Xác thực tài khoản thất bại</h1>
            </div>
        )
    } 
    else{
        return (
            <div>
                <h1>Xác thực tài khoản thành công</h1>
            </div>
        )
    }
}

export default Verify;