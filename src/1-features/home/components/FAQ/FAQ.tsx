
import classes from "./FAQ.module.css"
import OneFAQ from "./OneFAQ";

const FAQ = () => {



    return (
        <>
            <div id="FAQ" className={classes.FAQ_section}>
                <h2 className={classes.title}>
                    Frequently Asked <span className={classes.span_title}>Questions</span>
                </h2>
                <p className={classes.suptitle}>
                    Here are some of the most common questions people ask about IronZone and how we help you reach your fitness goals.
                </p>

                <div className={classes.container}>
                    <OneFAQ
                        Question="What Makes IronZone Different from Other Gyms?"
                        answer="IronZone offers a complete fitness experience with state-of-the-art equipment, personalized training plans tailored to your goals, and a motivating atmosphere with expert coaches to guide you every step of the way."
                    />

                    <OneFAQ
                        Question="How Can I Get Started at IronZone?"
                        answer="Simply visit our gym or register online. We provide a free initial fitness assessment and create a training plan that best suits your needs."
                    />

                    <OneFAQ
                        Question="Do You Offer Nutrition Plans Along with Training?"
                        answer="Yes! We provide customized nutrition plans designed to help you achieve your goals, whether it’s losing weight or building muscle — all created in collaboration with certified nutrition experts."
                    />

                    <OneFAQ
                        Question="Can I Change My Training Plan After I Start?"
                        answer="Absolutely! If you want to adjust your goals or try a new training style, our team will update your plan and monitor your progress to keep you on track."
                    />

                    <OneFAQ
                        Question="What Kind of Support Can I Expect from the Trainers?"
                        answer="Our trainers are with you during every session — teaching proper technique, tracking your progress, and keeping you motivated to stay consistent and reach your goals safely."
                    />
                </div>
            </div>
        </>
    );
}

export default FAQ;