import "./directory-item.styles.scss";

import { useNavigate } from "react-router-dom";

const DirectoryItem = ({ category }) => {
    const { imageUrl, title, route } = category;
    const navigate = useNavigate();

    const goNavigateHandler = () => {
        navigate(route);
    };

    return (
        <div className="directory-item-container" onClick={goNavigateHandler}>
            <div
                className="background-image"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
            />
            <div className="body">
                <h2>{title}</h2>
                <p>Shop now</p>
            </div>
        </div>
    );
};
export default DirectoryItem;
