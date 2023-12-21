import React, {useState} from "react";
import AxiosInstance from "../helper/AxiosInstance";
import logo from '../css/logo.svg'


const Login = (props) => {
  const {saveUser} = props;
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  // const [logo, setLogo] = useState('../css/logo.svg')

  const handleLogin = async () =>{
    try {
      const body = {
        email: email,
        password: password
      };
      const result = await AxiosInstance().post('/users/login', body);
      saveUser(result);
      alert('Đăng nhập thành công.');
    } catch (error) {
      console.log(error,"error");
      alert('Đăng nhập thất bại.');
    }
  }
  return (
    <div>
      <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
          <div class="content-wrapper d-flex align-items-center auth">
            <div class="row flex-grow">
              <div class="col-lg-4 mx-auto">
                <div class="auth-form-light text-left p-5">
                  <div class="brand-logo">
                    <img src={logo}/>
                  </div>
                  <h4>Hello! let's get started</h4>
                  <h6 class="font-weight-light">Sign in to continue.</h6>
                  <form class="pt-3">
                    <div class="form-group">
                      <input type="email" class="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" placeholder="Email"/>
                    </div>
                    <div class="form-group">
                      <input type="password" class="form-control form-control-lg"  value={password} onChange={(e) => setPassWord(e.target.value)} id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    <div class="mt-3">
                      <button type="button" class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn" onClick={handleLogin}>Sign IN</button>
                    </div>
                    <div class="my-2 d-flex justify-content-between align-items-center">
                      <div class="form-check">
                        <label class="form-check-label text-muted">
                          <input type="checkbox" class="form-check-input"/> Keep me signed in </label>
                      </div>
                      <a href="/SendEmail" class="auth-link text-black">Forgot password?</a>
                    </div>
                    <div class="mb-2">
                      <button type="button" class="btn btn-block btn-facebook auth-form-btn">
                        <i class="mdi mdi-facebook me-2"></i>Connect using facebook </button>
                    </div>
                    <div class="text-center mt-4 font-weight-light"> Don't have an account? <a href="register.html" class="text-primary">Create</a>
                    </div>
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

export default Login;
