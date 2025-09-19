const products = document.getElementById("products");
const formProducts = document.getElementById("form-products");
const btnCancel = document.getElementById("btn-cancel");
const btnAdd = document.getElementById("btn-add")

const nameValue = document.getElementById("name").value;
const namePrice = document.getElementById("price").value;

const API_URL = "http://localhost:3000/products";

function renderProducts(data) {
    products.innerHTML = data;
}

let productsId = null;

async function fetchProducts() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        const content = data.map((item)=>
            `<div>
                <h3>${item.name}</h3>
                <h3>${item.price}</h3>
                <button onclick="">Cập Nhật</button>
                <button onclick="deleteProduct(${item.id})
                ">Xóa</button>
            </div>`
        ).join("");
        renderProducts(content);
        // fetch(API_URL)
        //     .then((res) => res.json())
        //     .then((data) => console.log(data));
    } catch (error) {
        console.log(error);
    }
}

async function updateProducts(id) {
    
    productsId = id;
    btnCancel.style.display = "block";
    btnAdd.innerHTML = "Cập Nhật";
    try {
        const res = await fetch(`${API_URL}/${id}`);
        if(!res.ok) {
            alert("Không tìm thấy sản phẩm")
            return;
        }
        const data = await res.json();
        console.log(data);
        formProducts.name.value = data.name;
        formProducts.price.value = data.price;

    } catch (error) {
        
    }
}
 function cancelUpdate() {
    btnAdd.innerHTML = "Thêm Mới";
    btnCancel.style.display = "none";
    productsId = null;
    formProducts.reset();
}

btnCancel.addEventListener("click", (e) => {
    addEventListener.preventDefault();
    cancelUpdate
})
async function deleteProduct(id) {
    if(!confirm('Bạn muốn xóa không?')) return; 
        try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });
        if(!res.ok) {
            alert("Xóa thất bại");
        }
        fetchProducts();
    } catch (error) {
        console.log(error);
    }
    }

async function submitForm(e) {
    e.preventDefault();
    const formdata = new FormData(formProducts);
    const formDataObj = Object.fromEntries(formdata);

    if(!formDataObj.name || formDataObj.name.length < 3) {
        alert("Tên sản phẩm không được để trống và phải trên 3 kí tự");
        return;
    }
    if(Number.isNaN(formDataObj.price) || !formDataObj.price || !formDataObj.price > 1) {
        alert("Giá tiền phải lớn hơn 1")
        return;
    }
    try {
        if(!productsId) {
            const res = await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify(formDataObj),
                headers: {
               "Content-Type": "application/json"
                }
            });
            if(!res.ok) {
                alert("Thêm thất bại")
            }
        }
        if(productsId) {
            const res = await fetch(`$API_URL}/${productsId}`, {
                method: "PUT",
                body: JSON.stringify(formDataObj),
                headers: {
               "Content-Type": "application/json",
        },
    });
    if(!res.ok) {
        alert("Thêm thất bại");
    }
    cancelUpdate();
}
formProducts.reset();
        fetchProducts()
    } catch (error) {
        
    }
}

formProducts.addEventListener("submit", (e)=>{
    e.preventDefault()
    addProducts()
});
console.log(formProducts);

fetchProducts();
