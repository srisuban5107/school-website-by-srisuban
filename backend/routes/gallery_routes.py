from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import uuid

from fastapi.responses import FileResponse

router = APIRouter()

# Folder to store uploaded images
UPLOAD_DIR = "uploads/gallery"

# Create folder if not exists
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    try:
        # generate unique filename
        file_ext = file.filename.split(".")[-1] if "." in file.filename else "jpg"
        filename = f"{uuid.uuid4()}.{file_ext}"

        file_path = os.path.join(UPLOAD_DIR, filename)

        # save file
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        return {
            "message": "Image uploaded successfully",
            "filename": filename,
            "path": file_path
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/")
def get_images():
    try:
        files = os.listdir(UPLOAD_DIR)

        images = []
        for f in files:
            images.append({
                "filename": f,
                "url": f"/gallery/files/{f}"
            })

        return {"images": images}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/files/{filename}")
def get_file(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(file_path)

@router.delete("/delete/{filename}")
def delete_image(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    os.remove(file_path)

    return {"message": "Image deleted successfully"}