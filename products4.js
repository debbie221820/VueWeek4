import{createApp}from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';

// 匯入分頁
import pagination from './pagination.js';

const site=`https://vue3-course-api.hexschool.io/v2/`;
const api_path='debbiewang';
let productModal={};
let delProductModal={};

const app = createApp({
     // 區域注刪
    components:
    {pagination
    },
    data() {
       return {  
            products:[], //定義資料,預備取得資料
            tempProducts:{                
                imagesUrl:[],
            //暫存用: click點選查看商品細節,裡面資料暫存入tempProducts
        },
            isNew:false,
            pagination:{},    
        }
        },
    methods: {
        checkLogin(){
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)debbiewang\s*\=\s*([^;]*).*$)|^.*$/,"$1");
        axios.defaults.headers.common["Authorization"] = token;
        console.log(token);
        const url=`${site}api/user/check`;
        axios.post(url)
        .then(()=>
        { this.getProducts();
        })
        .catch((err)=>{
            console.log(err);
        });
       

        },
        // 產品&分頁(參數預設值  query  ?page=${page};  ?page=2 第二頁)
        getProducts(page= 1){
            const url=`${site}/api/${api_path}/admin/products/?page=${page}`;
            axios.get(url)
            .then((res)=>{
                this.products=res.data.products; 
                this.pagination=res.data.pagination;   


            });
        
        },
        openModal(status,product){
            console.log(status,product);
            if(status==='isNew'){
                this.tempProducts={
                    imagesUrl:[],
                },
                productModal.show(); 
                this.isNew=true;
            } else if (status==='edit'){
                this.tempProducts={...product};
                productModal.show(); 
                this.isNew=false;
            } else if (status==='delete'){
                this.tempProducts={...product};
                delProductModal.show(); }
    },

    delProducte(){
        let url=`${site}api/${api_path}/admin/product/${this.tempProducts.id}`;  
        axios.delete(url,{data:this.tempProducts})
        .then((res)=>{
            console.log(res);
    
            this.getProducts();    
            delProductModal.hide();
     } ); 
    }
},  
        //  console.log(Object.values( this.products));  //物件變陣列
    //     Object.values( this.products).forEach((item)=>{console.log(item);  //物件跑迴圏            
    //     })
 

    mounted() {
        this.checkLogin();
        productModal= new bootstrap.Modal(document.getElementById('productModal'));
        productModal.hide();
        delProductModal= new bootstrap.Modal(document.getElementById('delProductModal'));
        // delProductModal.show();
    },
        
});

//全域注冊
app.component('productModal',{
    props:['tempProducts'],
    template:'#templateForProductModal',
methods:{
    updateProduct(){
        let url=`${site}api/${api_path}/admin/product`;
        let methods='post';
        if(!this.isNew){
            url=`${site}api/${api_path}/admin/product/${this.tempProducts.id}`;
            methods='put';
        }
    
        axios[methods](url,{data:this.tempProducts})
        .then((res)=>{
            console.log(res);
            // this.getProducts();  (搬到內層没有:這是內層方法)
            this.$emit('get-products')   
            productModal.hide();
     } );        
        },
}
})


app.mount('#app');


//1.productModal--> bootstrap 建立modal 實體......,document.getElementById('productModal')
//2.openModal();

//modal 開啟後 3秒 結束 --> productModal.show();
                      //  setTimeout(()=>{
                      //  productModal.hide()
                      //  },3000);

 //3.綁數字 (.number):  v-model.number="tempProducts.price"
//4. 做多圖  imagesUrl:[],