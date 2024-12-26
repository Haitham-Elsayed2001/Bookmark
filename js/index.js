var bookmarkNameIput=document.getElementById("bookmarkName");
var bookmarkUrlInput=document.getElementById("bookmarkUrl");

var allbookmarks=[];
var dataWrapper=document.getElementById("table-content");
var bookmarkupdate;

var bookmark;

function addBookmark(){

  if(validateurl() == true && bookmarkNameIput.value!=""){
    // console.log("addBookmark");
  
    var bookmark={
        bookmarkName:bookmarkNameIput.value,
        bookmarkUrl:bookmarkUrlInput.value
    }
    allbookmarks.push(bookmark);
    localStorage.setItem('allbookmarks',JSON.stringify(allbookmarks));
    // console.log(allbookmarks);
    displaydata(allbookmarks);
    clear();
  }
   else{

    Swal.fire({
        title: "invalid data!",
        text: ` ${validateurl() == false ? "please enter a valid url" : ""} ${bookmarkNameIput.value == "" ? "& please enter a valid bookmark" : ""}`,

        icon: "success"
      });
   
   }
    
}


if(localStorage!=null){
    allbookmarks=JSON.parse(localStorage.allbookmarks);
    displaydata(allbookmarks);
}


function displaydata(arry){
    var cartona="";
    for(var i=0;i<arry.length;i++){
       cartona+=`  
    <tr>
       <td>${i}</td>
       <td>${arry[i].bookmarkName}</td>
       <td><a class="btn btn-success" href="${arry[i].bookmarkUrl} " target="_block">Visite</a></td>
       <td><button class="btn btn-warning" onclick="preupdate(${i})">Update</button></td>
       <td><button class="btn btn-danger"onclick="DeleteBookMark(${i})">Delete</button></td>
       
    </tr>
    `;
   }
    dataWrapper.innerHTML=cartona;
}

function preupdate(index){
    bookmarkupdate = index;
    bookmarkNameIput.value = allbookmarks[index].bookmarkName;
    bookmarkUrlInput.value = allbookmarks[index].bookmarkUrl;
    displayUpdate();
    
    
}


function displayUpdate(){
  
    document.getElementById("submitBtn").classList.replace('d-block','d-none')
    document.getElementById("updateBtn").classList.replace('d-none','d-block')
}
function finalUpdate(){
    var bookmark={
        bookmarkName:bookmarkNameIput.value,
        bookmarkUrl:bookmarkUrlInput.value
    };
    allbookmarks.splice(bookmarkupdate, 1 , bookmark);
    localStorage.setItem('allbookmarks',JSON.stringify(allbookmarks));
    displaydata(allbookmarks);
    displaySubmit();
    clear();


}
function displaySubmit(){
    document.getElementById("submitBtn").classList.replace('d-none','d-block')
    document.getElementById("updateBtn").classList.replace('d-block','d-none')
}


function DeleteBookMark(index){
    allbookmarks.splice(index,1);
    localStorage.setItem('allbookmarks',JSON.stringify(allbookmarks));
    displaydata(allbookmarks);
}

function clear(){
    bookmarkNameIput.value="";
    bookmarkUrlInput.value="";
}

function validateurl(){
    var pattern =
                /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;

            return pattern.test(bookmarkUrlInput.value);
}
