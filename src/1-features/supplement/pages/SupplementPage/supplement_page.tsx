import classes from "./supplement_page.module.css";
import { Link, useRouteLoaderData } from "react-router-dom";
import { useSupplements } from "../../components/SupplementContext";
import type { ISupplementDto } from "../../../../2-shared/types/supplement";
import { useCart } from "../../../cart/components/CartContext";
import { useEffect, useState } from "react";
import type { ICartItemDto } from "../../../../2-shared/types/cart";

function SupplementPage() {
    const token = useRouteLoaderData("root")
    const { supplements, loading, setLoading } = useSupplements()
    const { AddToGuestCart, AddToUserCart, userCart, guestCart } = useCart();
    const [isAdded, setIsAdded] = useState<number | null>(null)

    // Search
    const [searchTerm, setSearchTerm] = useState("");
    const [allSupplements, setAllSupplements] = useState<ISupplementDto[]>([]);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const supplementPerPage = 8;
    const totalPages = Math.ceil(allSupplements.length / supplementPerPage);
    const LastIndex = currentPage * supplementPerPage
    const FirstIndex = LastIndex - supplementPerPage
    const currentSupplement = allSupplements.slice(FirstIndex, LastIndex)

    // Add To Cart
    const handleAddToCart = (supplement: ISupplementDto) => {
        token ? AddToUserCart(supplement) : AddToGuestCart(supplement)
        setIsAdded(supplement.id)
        setTimeout(() => {
            setIsAdded(null)
        }, 1000);
    }

    // Search useEffect
    useEffect(() => {
        // delay لو المستخدم كتب حاجة في البحث اعمل 
        if (searchTerm.trim() !== "") {
            setLoading(true);
            const delay = setTimeout(() => {
                setAllSupplements(
                    supplements.filter((i) =>
                        i.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                );
                setCurrentPage(1);
                setLoading(false);
            }, 300);

            return () => clearTimeout(delay);
        } else {
            // delay لو البحث فاضي على طول رجع كل المنتجات من غير 
            setAllSupplements(supplements);
            setCurrentPage(1);
            setLoading(false);
        }
    }, [searchTerm, supplements]);

    // Smooth Scrool
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    return (
        <>
            <div className={classes.container}>
                <div className={classes.search}>
                    <input
                        type="text"
                        placeholder="Search for supplements..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className={classes.grid}>
                    {currentSupplement && currentSupplement.length > 0 ?
                        currentSupplement.map((supplement) => {
                            const itemInCart: ICartItemDto | ISupplementDto | undefined = token
                                ? userCart.find((i) => i.productDetails?.id === supplement.id)
                                : guestCart.find((i) => i.id === supplement.id);

                            const itemsCount = itemInCart ? "quantity" in itemInCart ? itemInCart.quantity
                                : itemInCart.UserQuantity ?? 0
                                : 0;

                            return (
                                <div key={supplement.id} className={classes.card}>
                                    <img
                                        src={supplement.image_url}
                                        alt={supplement.name}
                                        className={classes.image}
                                    />
                                    <div className={classes.cardContent}>
                                        <h3 className={classes.title}>{supplement.name}</h3>
                                        <strong className={classes.price}>
                                            {parseFloat(supplement.price).toFixed(2)} EGP
                                        </strong>

                                        <div className={classes.buttonContainer}>
                                            <button
                                                onClick={() => handleAddToCart(supplement)}
                                                className={`${classes.addButton} ${isAdded === supplement.id ? classes.isAdded : ""}`}
                                            >
                                                {isAdded === supplement.id ? "Added!" : "Add To Cart"}
                                                {itemsCount > 0 && (
                                                    <p className={classes.QuantityOneSupplement}>
                                                        {itemsCount}
                                                    </p>
                                                )}
                                            </button>

                                            <Link to={`${supplement.id}`} className={classes.learnMoreButton}>
                                                Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                        : loading ?
                            <p className={classes.loading}>Loading...</p>
                            : <p className={classes.error}>No Supplement Found</p>}
                </div>
                <div className={classes.pagination}>
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={classes.nav_button}
                    >
                        Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`${classes.page_button} ${currentPage === i + 1 ? classes.active : ""}`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={classes.nav_button}
                    >
                        Next
                    </button>

                </div>
            </div>
        </>
    );
}

export default SupplementPage;