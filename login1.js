import{createApp}from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
const site=`https://vue3-course-api.hexschool.io/v2/`;

const app = createApp({
    data() {
        
        return {
            user:{
                username:'',
                password:'',
            }
        }
        },
    methods: {
        login(){
           console.log(this.user);
           const url=`${site}admin/signin`;
           axios.post(url,this.user)
           .then((res)=>{
               console.log(res);
               const{ token,expired }=res.data;
               console.log(token,expired);              
           document.cookie =`debbiewang=${token}; expires=${new Date(expired)}`;
        window.location="products4.html"
           })
        .catch((err)=>{
            console.log(err);

        });
        }
    },
    mounted() {
        
    },

});
app.mount('#app');



//js-->import ESM ; html-->tpye:module;
//site:`..........`
//js--> user:{username:'',passworw",} ;
//html 輸入的欄位加上--> v-model=v-model="user.username";v-model=v-model="user.passwore";
//js--> 方法 methods: {login(){ console.log(this.user)}};檢查登入 user...和pass...
// html 登入的事件 --> @click:login  


//連結 api :送出請求 & 接收 data  
//取出 token & expired ; 用展開的方式  
//儲存cookie 方法查 MDN ((cookie的名字)为自定义的名字。
//轉址到下一綱頁頁面(商品)
