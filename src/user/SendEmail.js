import React, {useState} from "react";
import AxiosInstance from "../helper/AxiosInstance";
import logo from '../css/logo.svg'


const SendMail = (props) => {
  const [email, setEmail] = useState('');
  // const [logo, setLogo] = useState('../css/logo.svg')

  const handleLogin = async () =>{
    try {
      const body = {
        email: email,
        // password: password
      };
      const result = await AxiosInstance().post('/users/forgetPassword', body);
      if(result){
      alert('Gửi email thành công.');
      window.location.href = '/login'
      }
    } catch (error) {
      console.log(error,"error");
      alert('Gửi email thất bại.');
    }
  }
  return (
    <div>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth">
            <div className="row flex-grow">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left p-5">
                  <div className="brand-logo">
                    <img src={logo}/>
                  </div>
                  <h4>Nhập Email</h4>
                  {/* <h6 className="font-weight-light">Sign in to continue.</h6> */}
                  <form className="pt-3">
                    <div className="form-group">
                      <input type="email" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" placeholder="Email"/>
                    </div>
                    {/* <div className="form-group">
                      <input type="password" className="form-control form-control-lg"  value={password} onChange={(e) => setPassWord(e.target.value)} id="exampleInputPassword1" placeholder="Password"/>
                    </div> */}
                    <div className="mt-3">
                      <button type="button" className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn" onClick={handleLogin}>Send Email</button>
                    </div>
                    <div className="my-2 d-flex justify-content-between align-items-center">
                      {/* <div className="form-check">
                        <label class="form-check-label text-muted">
                          <input type="checkbox" class="form-check-input"/> Keep me signed in </label>
                      </div> */}
                      {/* <a href="#" class="auth-link text-black">Forgot password?</a> */}
                    </div>
                    {/* <div class="mb-2">
                      <button type="button" class="btn btn-block btn-facebook auth-form-btn">
                        <i class="mdi mdi-facebook me-2"></i>Connect using facebook </button>
                    </div>
                    <div class="text-center mt-4 font-weight-light"> Don't have an account? <a href="register.html" class="text-primary">Create</a>
                    </div> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMail;
