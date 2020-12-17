import {useState} from 'react';
import axios from 'axios';
import '../css/ReviewTextBox.scss';
import star_full from '../assets/images/star_full.png';
import star_empty from '../assets/images/star_empty.png';
import close from '../assets/images/icon_close.png';

function ReviewTextBox(props) {

  let [comment, setComment] = useState("");
  let [starrate, setStarRate] = useState(0);
  let [checked, isChecked] = useState(false);
  // 이미지 파일 관련 변수
  let [content, setContent] = useState({ files: []});
  let [uploadedImg, setUploadedImg] = useState([]);

  function mouseEnter(index){
    let mousepoint = null;

    if(checked) return;

    for(let i = 1; i <= 5; i++){
      mousepoint = document.getElementsByClassName(`star-rate-${i}`);

      if(i <= index){
        mousepoint[props.index].style.background = `url(${star_full}) no-repeat`;
      }else {
        mousepoint[props.index].style.background = `url(${star_empty}) no-repeat`;
      }
      mousepoint[props.index].style.backgroundSize = "contain";
    }
  }
  function mouseLeave(){
    if(!checked){
      let mousepoint = null;

      for(let i = 1; i <= 5; i++){
        mousepoint = document.getElementsByClassName(`star-rate-${i}`);
        mousepoint[props.index].style.background = `url(${star_empty}) no-repeat`;
        mousepoint[props.index].style.backgroundSize = "contain";
      }
    }
  }
  function mouseClick(index){
      // 별점을 부여하지 않았으면
      if(!checked){
        setStarRate(index);
        isChecked(true);
      }else{
        if(window.confirm("별점을 다시 부여하겠습니까?")){
          setStarRate(0);
          isChecked(false);
        }else{
          // do nothing
        }
      }



  }
  function handleSubmit(e){
    let commentval = document.getElementsByClassName('comment')[props.index];
    // e.preventDefault();
    axios.post('http://localhost:3000/api/review_detail/add', {
          star:starrate,
          comment:comment,
          category:props.category
    }).then((res)=>{
      // 초기화 작업
      commentval.value = "";
      isChecked(false);
      setComment(null);
      setStarRate(0);
    }).catch((err)=>{
      console.log(err);
      throw new Error(err);
    })
  }
  function imgChange(e){
    var files = e.target.files;
    var fileArr = Array.prototype.slice.call(files);
    setContent({ files: [...content.files, ...fileArr]});

    // 같은 파일 다시 올리게 할 수 있는 작업
    e.target.value = null;

    // 파일 올라갈 시 파일 미리보기 화면 보이게 style 변경
    document.getElementsByClassName('image-preview')[props.index].style.display = "block";

    fileArr.map((file)=>{
      let reader = new FileReader();
      reader.onloadend = e => {

        let img = reader.result;
        let arr = uploadedImg;
        arr.push(img);
        setUploadedImg(arr);
      }
      reader.readAsDataURL(file);
    });
  }
  function closeImgMouseHover(flag){

    let previewBox = document.getElementsByClassName('image-preview')[props.index];

    if(flag === 'in'){
      previewBox.firstElementChild.style.border = "1px solid #eee";
      previewBox.firstElementChild.firstElementChild.style.width = "18px";
      previewBox.firstElementChild.firstElementChild.style.height = "18px";
    }
    else if(flag === 'out'){
      previewBox.firstElementChild.style.border = "";
      previewBox.firstElementChild.firstElementChild.style.width = "17px";
      previewBox.firstElementChild.firstElementChild.style.height = "17px";
    }

  }
  function closeImgClick(index){
    let uploadImgArr = uploadedImg;
    let contentArr = content;
    uploadImgArr.splice(index, 1);
    contentArr.files.splice(index, 1);

    if(uploadImgArr.length == 0)
      document.getElementsByClassName('image-preview')[props.index].style.display = "none";

    console.log(document.getElementsByClassName('file-upload')[props.index].firstElementChild.value);
    setContent(contentArr);
    setUploadedImg(uploadImgArr);
    console.log(content);
    console.log(uploadedImg);
  }


  return(
    <form className="textbox-wrap">

      <div className="comment-icon-wrap" onMouseLeave={mouseLeave}>
        <div className="file-upload-wrap">
          <label className="file-upload">
            <input type="file"
              accept = "image/jpg,image/png,image/jpeg"
              multiple onChange={imgChange}/>
          </label>
        </div>

        <div className="star-rate-1" onMouseEnter={()=>{mouseEnter(1)}} onClick={()=>{mouseClick(1)}}></div>
        <div className="star-rate-2" onMouseEnter={()=>{mouseEnter(2)}} onClick={()=>{mouseClick(2)}}></div>
        <div className="star-rate-3" onMouseEnter={()=>{mouseEnter(3)}} onClick={()=>{mouseClick(3)}}></div>
        <div className="star-rate-4" onMouseEnter={()=>{mouseEnter(4)}} onClick={()=>{mouseClick(4)}}></div>
        <div className="star-rate-5" onMouseEnter={()=>{mouseEnter(5)}} onClick={()=>{mouseClick(5)}}></div>
        <span>(별점: {starrate} / 5)</span>
      </div>

      <div className="image-preview">
        {
          uploadedImg
          ? uploadedImg.map((item, i)=>{
              return <div style={{width:'52px', height:'52px', position: 'relative'}} key={i}>
                       <img style={{position:'absolute', width: '17px', height:'17px', right:'0', margin:'-5px -5px 0 0'}} src={close} onMouseEnter={()=>{closeImgMouseHover('in')}} onMouseLeave={()=>{closeImgMouseHover('out')}} onClick={()=>{closeImgClick(i)}}/>
                       <img style={{width: '50px', height: '50px'}} src={item}/>
                     </div>
          })
          : null
        }
      </div>

      <textarea className="comment" onChange={(e)=>{setComment(e.target.value)}}></textarea>
      <span className="comment-length">({comment.length} / 최대 300자)</span>
      <button onClick={(e)=>{handleSubmit(e)}}>등록</button>
    </form>

  )
}

export default ReviewTextBox;
