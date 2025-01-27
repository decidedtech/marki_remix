  import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Land from "../../public/land.jpg";
import Land1 from "../../public/land1.jpg";
import Coast from "../../public/coast.jpg";
import Coast1 from "../../public/coast1.jpg";

const Gallery = () => {
  return (
    <div className=" max-w-6xl w-full p-8 rounded-xl">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 2 }}>
        <Masonry gutter="20">
          <img
            src={Land1}
            width={500}
            height={500}
            alt="Land 1"
            className="w-full"
           />
          <img
            src={Coast1}
            width={500}
            height={500}
            alt="Coast 1"
            className="w-full"
           />
          <img
            src={Coast}
            width={500}
            height={500}
            alt="Coast"
            className="w-full"
           />
          <img
            src={Land}
            width={500}
            height={500}
            alt="Land"
            className="w-full"
           />
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default Gallery;
