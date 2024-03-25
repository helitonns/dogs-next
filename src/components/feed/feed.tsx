import { Photo } from "@/actions/photos-get";
import FeedPhotos from "./feed-fotos";

export default function Feed({photos} : {photos: Photo[]}) {
  
  return (
    <div>
      <FeedPhotos photos={photos} />
    </div>
  );
}