import React from "react";
import './OfTheWeek.css'

function OfTheWeek() {
    return(
        <div className="of-the-week">
            <div className="date">
                <p>27/12/18 <span className='comments-count'>O comments</span></p>
            </div>

            <h2>Person of the Week</h2>

            <div className="main">
                <img src="http://cafeanimesh.weebly.com/uploads/1/2/8/7/12874363/6658877.jpg" alt="" className="main-person"/>

                <p className="main-content">
                    <span></span>
                    Amartya Sen, (born 3 November 1933) is an Indian economist who was awarded the 1998 Nobel Memorial Prize in Economic Sciences for his contributions to welfare economics and social choice theory, and for his interest in the problems of society's poorest members. Sen is best known for his work on the causes of famine, which led to the development of practical solutions for preventing or limiting the effects of real or perceived shortages of food. Amartya has been called "the Conscience and the Mother Teresa of Economics" for his work on famine, human development theory, welfare economics, the underlying mechanisms of poverty, gender inequality, and political liberalism. However, he denies the comparison to Mother Teresa by saying that he has never tried to follow a lifestyle of dedicated self-sacrifice.

                    He helped to create the United Nations Human Development Index. In 2012, he became the first non-American recipient of the National Humanities Medal.

                    He is currently the Thomas W. Lamont University Professor and Professor of Economics and Philosophy at Harvard University. He is also a senior fellow at the Harvard Society of Fellows, distinguished fellow of All Souls College, Oxford and a Fellow of Trinity College, Cambridge, where he previously served as Master from 1998 to 2004. He is the first Indian and the first Asian academic to head an Oxbridge college.

                    Amartya Sen's books have been translated into more than thirty languages over a period of forty years. He is a trustee of Economists for Peace and Security. In 2006, Time magazine listed him under "60 years of Asian Heroes" and in 2010 included him in their "100 most influential persons in the world". New Statesman listed him in their 2010 edition of "World's 50 Most Influential People Who Matter".
                </p>
            </div>
        </div>
    )
}

export default OfTheWeek