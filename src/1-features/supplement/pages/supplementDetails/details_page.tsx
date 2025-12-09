import { useLoaderData, useNavigate, useRouteLoaderData } from "react-router-dom";
import classes from "../supplementDetails/details_page.module.css"; // ✅ بدون {}
import { IoCaretBack } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import type { ISupplementDto, supplementLoaderType } from "../../../../2-shared/types/supplement";
import { useCart } from "../../../cart/components/CartContext";

const DetailsPage = () => {
    const { supplementData } = useLoaderData() as supplementLoaderType;
    const token = useRouteLoaderData("root")

    const supplement: ISupplementDto | null = supplementData;
    const navigate = useNavigate();

    const { AddToGuestCart, AddToUserCart } = useCart();

    if (!supplement) {
        return <p className={classes.errorText}>Failed to load supplement details.</p>;
    }

    const handleAddToCart = (supplement: ISupplementDto) => {

        token ? AddToUserCart(supplement) : AddToGuestCart(supplement)
    }

    return (
        <div className={classes.detailsContainer}>
            <div className={classes.detailsCard}>
                <div className={classes.imageSection}>
                    <img
                        src={supplement.image_url}
                        alt={supplement.name}
                        className={classes.supplementImage}
                    />
                </div>

                <div className={classes.infoSection}>
                    <h2 className={classes.supplementTitle}>{supplement.name}</h2>
                    <p className={classes.supplementDescription}>{supplement.description}</p>

                    <div className={classes.supplementMeta}>
                        <p>
                            <strong>Capacity:</strong> {supplement.capacity} g
                        </p>
                        <p>
                            <strong>Remaining:</strong> {supplement.remaining_quantity}
                        </p>
                        <p className={classes.supplementPrice}>EGP {supplement.price}</p>
                    </div>

                    <div className={classes.buttonGroup}>
                        <button
                            className={classes.backButton}
                            onClick={() => navigate(-1)}
                        >
                            <IoCaretBack />
                            Back
                        </button>
                        <button className={classes.buyButton}
                            onClick={() => handleAddToCart(supplement)}
                        >
                            <FaShoppingCart />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;