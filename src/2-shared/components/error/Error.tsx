import classes from "../../components/error/Error.module.css"

function Error() {
    return (
        <>
            <main className={classes.mainError}>
                <h1 className={classes.text}>An Error occurred!</h1>
                <p className={classes.supText}>Could Not Found This Page</p>
            </main>
        </>
    )
}

export default Error