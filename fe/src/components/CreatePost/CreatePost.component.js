import axios from "axios";
import { useRef, useState } from "react";
import { URL_SERVER } from "../../dataConfig";
import { v4 as uuidv4 } from 'uuid';
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react';

const CreatePost = () => {
    const [imageSrc, setImageSrc] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const present_key = "gfbryc3z";
    const cloud_name = "dtpujfoo8";

    const handleImageUpload = async (event) => {
        const files = event.target.files;
        const selectedImagesArray = Array.from(files);
        setSelectedImages(selectedImagesArray);

    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log(selectedImages);
         selectedImages.forEach((image) => {
            formData.append('file', image);
            formData.append('upload_preset', present_key)
            formData.append('public_id', uuidv4());
            callToClould(formData)
        })
        

    }
    const callToClould = async (formData) => {
        try {
            const res_data =await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
            console.log(res_data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="container mt-5">
            <h2>Create Post</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="image">Ảnh :</label>
                    
                    <input type="file" accept="image/*" className="form-control" multiple id="image"  onChange={handleImageUpload} />
                    <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
                    {selectedImages.map((image,index) => {
                         <Image key={index} publicId={image.name}>
                         <Transformation width="200" crop="scale" />
                       </Image>
                    })}
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select className="form-control" id="category">
                        <option value="">-- Select Category --</option>
                        <option value="category1">Category 1</option>
                        <option value="category2">Category 2</option>
                        <option value="category3">Category 3</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" className="form-control" id="title" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea className="form-control" id="description"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text" className="form-control" id="address" />
                </div>
                <div className="form-group">
                    <label htmlFor="area">Area:</label>
                    <input type="number" className="form-control" id="area" />
                </div>
                <div className="form-group">
                    <label htmlFor="maxpeople">Max People:</label>
                    <input type="number" className="form-control" id="maxpeople" />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input type="number" className="form-control" id="price" />
                </div>
                <div className="form-group">
                    <label htmlFor="deposit">Deposit:</label>
                    <input type="number" className="form-control" id="deposit" />
                </div>
                <div className="form-group">
                    <label htmlFor="security">Security:</label>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="security1" />
                        <label className="form-check-label" htmlFor="security1">Security 1</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="security2" />
                        <label className="form-check-label" htmlFor="security2">Security 2</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="security3" />
                        <label className="form-check-label" htmlFor="security3">Security 3</label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="utils">Utilities:</label>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="utils1" />
                        <label className="form-check-label" htmlFor="utils1">Utilities 1</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="utils2" />
                        <label className="form-check-label" htmlFor="utils2">Utilities 2</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="utils3" />
                        <label className="form-check-label" htmlFor="utils3">Utilities 3</label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="interior">Interior:</label>
                    <input type="text" className="form-control" id="interior" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CreatePost