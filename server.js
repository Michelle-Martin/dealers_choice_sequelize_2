console.log('hello world ')
const Sequelize = require('sequelize')
const {STRING} = Sequelize

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/movie2')

const express = require('express')
const { INTEGER } = require('sequelize')
const app = express()
Movie = conn.define('movie', {
    id:{
        type: STRING, 
        primaryKey:true
    },
    name: {
        type: STRING(200)
    }, 
    rating: {
        type: STRING(3)
    }, 
    synopsis: {
        type: STRING(1000)
    }
});

Genre = conn.define('genre', {
    name: {
        type: STRING
}})

const syncAndSeed = async()=> {
    await conn.sync({force:true});
    Movie.create({id: 1, name: 'Catch Me If You Can', rt: '98%', synopsis: 'Leonardo DiCaprio as reallife wunderkind con artist Frank Abagnale. Steven Spielberg crafts a film thats stylish breezily entertaining and surprisingly sweet'})
    Movie.create({id: 2, name: 'Fyre', rt: '92%' , synopsis: 'Fyre smolders with agonizing tension when a party in paradise goes awry but this slickly assembled documentary reserves its greatest horror for damning observations about the dangers of wealth.' }) 
    Movie.create({id: 3, name: 'The Social Network', rt: '96%', synopsis: 'Impeccably scripted beautifully directed and filled with fine performances The Social Network is a riveting ambitious example of modern filmmaking at its finest.' })
    Movie.create({id: 4, name: 'Moonlight' , rt: '98%', synopsis: 'Moonlight uses one mans story to offer a remarkable and brilliantly crafted look at lives too rarely seen in cinema.' })
    Movie.create({id: 5, name:'Homecoming: A Film by Beyonce', rt:'98%' , synopsis: 'Beychella forever.' })
    Movie.create({id: 6, name: 'The Irishman', rt:'95%', synopsis:'An epic gangster drama that earns its extended runtime The Irishman finds Martin Scorsese revisiting familiar themes to poignant funny and profound effect.' })
    Movie.create({id: 7, name: 'Pick of the Litter', rt: '98%' , synopsis: ' Pick of the Litter has all the fluffy adorableness audiences expect from a puppy documentary along with a story thats as edifying as it is heartwarming.' })
    Genre.create({name: 'Drama'})
    Genre.create({name: 'Family'})
    Genre.create({name: 'Horror'})
    Genre.create({name: 'Music'})
    Genre.create({name: 'Documentary'})
    Genre.create({name: 'Comedy'})
}

Movie.belongsTo(Genre)
Genre.hasMany(Movie)

const html = `
<html> 
<head>
<link rel='stylesheet' href='/assets/style.css'/>
<img src="data:image/png;base64,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">
</head>
<body>
<h1> What to Watch on Netflix Now! </h1>
<h2> Genres </h2> 
<ul> 
<li>
</li>
</body>
</html>
`

app.get('/api/genres', async(req,res,next)=> {
    try {
        // response = (await Genre.findAll()).data
        const response = await Genre.findAll({})
        res.send(`
<html> 
<head>
<link rel='stylesheet' href='/assets/style.css'/>
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAA5FBMVEXcBQUJCQn+/v7///8AAADfBQUACgn6+voADgxucXHbBQXh4eHNy8zGBAaqBAbjBATPBQWBgYFFBwaUk5NZWVlxAgOkBQVOTk5qBAMlJSW2BAQ6AADWBQaAAACIAQAIHBwaCAgjCwjx8fFRAQWTCQpZAADV1dXBwcHs7Oynp6eysrKLi4vb29tnZ2fKBQa6BARKBwYdHR2bBAQ+Pj52AwCtra0TCgpiAAB3d3eenp46CQgnDAzFxcU0NDS4DBGcCQ1mERB4EROHERAxDA1NBAUwAAATAAA8CQpLUlJUAANFAgM3AACn0AyKAAANhklEQVR4nO2de0PaSBfGQZJR0+YiFaQ0sKDBVtEEaQoK7dot7Lr0/f7f5z1nLskkgCCu0T/Os9uKmUwy88uZM2cuoaUSiUQikUgkEolEIpFIJBKJRCKRSCTSfyDTLJkl/L9UsuA/Uxzif1nyOP8NPlmQbFqvVtI3IFOg0X41xaEVZ5WWE0gkEolEIpFIJBKJRCKRSCQSiUQikUgkEolEIpFIJNLukrt1xNampUR1hvxhWblMiUolPb+VnGTql1Cp2uHs/az0rkvFLOlpRe+5ck1eB9d18camK+umFcJMDib1tlRCLkWxExmRhn5CBpY85pp5hqX0SisOmtn7vhSV1TLv7+8DofvQsyL5673n+YqXaUaBOgf1p+/5IsG6148HKmPy+OuZZFtm4/KD9EbZjWaeLIIDF0q37znyUn/C0UjeNoKshVqWywwl9tOxW/JX9lcUqqqZbsvQdRBENk9zfWbkhRfxFaxJJmlStz11W9NWN/rZtDO0zKZK+RWFCQq3IY92hk1/IS84GkZeobBM464i9MVg83ps8M/H+BkrIc5pG5VU342DvxwbC2n6xmUlq0uofT3yhfczP91qSYdG51cTnoDFm6ptnOPBvsEGwwhvlJhj0/iCKSd4Jckd2l1TFOGzMfrVND7IQpZ/OaG10re9FKwPlT1UZd8oH/wcG/vwK5YDKqFMBGDti5PwvM+QhtWwENa35LhI/IaJQzQ8JPLpME0GWAwq6lmmhPUeb3QE51fvI6+kw3qHKSdQnEVKyzau8OiVwToteER4wTJe0NHbdmGw9iofoeCzBFaZP3Ju5W4eVpmbzxpYZdaoi2aah1XGyoUW30qcwiqzhyDy0gKlsMpswR9KSRoxHD2Fi3TBKOHjFzyhA7SswkzLTWFd491TWPyR86IqWKoZYtoC7U41Q5EfhbDK5b8c7m0krKQZQrZRrRlaWcuCoxONlg6rzOZDyd391Mf7VG7gsHGKn0Q5ukjrFWD18e4arPJBY2hjSCVhVd5z3fG0Ua0elnyjf46H+BXwwzm/BhvFUANLwTr9zpPEA3hoN708rDIbSyZ5WNxKhXU3vnLwcBXD4J9EOdi01SyMlgbrcgnWWauJdVCwZCdU5rB67chXvWGFu7w0kZ0FaJMCFviZNInN4AGUlmDNge5KWOW5KALEDsZeRTxR47iiGgKoC6BfAdY5h3WawmKDGq+DgvVRFE/AwlqYUYdBlhsJK0lkVai8mcJKs7HpOLCtJVi/a+tgVSVGdRieqNGv7KWlmfbarwHrdAlWtebwNrMK1iB2fNOyB2wVrIdafQ2sWS+IlmFVG9CoV8MSRYBYVXh4uBjvVURpkX4veAVY0MxysA7Ww2Ij3kQtz4ZocSWssLTWskqrYK2zLI4dC/p3X9ymLHKeS1gPr9IMRfm2gDWpzheLXi3A4MH0w/Y/GVij0agzWtUMuw+YbxxzG3qCZUlY5vhfGV1B0CqDlFzWomDxP7fbwar2WsFwWG9i8Ay0vMYfGqzOp3lv3IgDHIjkYM0breFw6PBw5Omw3KFREUUTneGRfDaauysIVoWX/G47WIPaMLLtUIy0TctsZWD9HreHdYePLDOw2HTRcmzb9jCo2AWWPN43RAzxVeTszONm0bCOKjI2X4JVWgELIptkSisP6yx2ACQfhOQsC4MNCzPuBAsi4M+i+d3ijz3pCKe9VlTYgEfCusa/3m0NC4fDIj80thwsGRithqVu+3RYJfefvnDsd9pF2UT0roXCOgZG2NNsBwuOroHFBCxzDSxLzVDtAot7eAgZvldUBF1wZ5hY1rmksRnWwSBuaoZvulnLWqTNYiUsmfT0ZugGwrMr1yX8e7VA/57AupSM3jAsR8QMJ9qArIz+vbg5GgnrsK8GXm8Xlic8/F1FBdA46bBoNa2im+HhsRp4beGzngErWZZ5OixTDwm/yM5wVqR/V7Bub+QQYgtY1Vh3E1vDGi2eZVmQcnacDDY+S1iTMZ/EKEgqzkIc+Lweg6XWJHp6B7QNLKEuXm1ny8JiHCSwPij/XuBgR4OFJdyDKj0C6xS1f2mwhpPS2ghrb0/kuzZwnk4l7QDLrXMPn8zqIqy5mpQoRAksHr18fQyWnB/GFlBLV1W2gKWmldms3ZSrkTvBavJFC37FG9kZYlT3CrB4XHz7KCzNXeBimFx73wwrXbCYtf8Uc8A7NcNhUgzpPtlMHxUUBqsvRlx3W1gWLhSwcsORK6AK1t5aWPqCBdgWp7WTZbX/SHyWaIY42Ckufk9gfeBjebCax3zW1Tnoii8U8DWJDKx92TCWHfz+Oc8nFywCsQS7C6wF9IaVjIOHwU74GrDKUA4YSm/RG4pOWwU4CtbpWliZBYtpY8fJPyxqP4mz5NDwN6QWuCKdwMKeBh3Pu41xllCy7LLRsrZYsNgKliVm4S9lRIid4VnsFOiyNFh8KH2zNayBLOfTYKmJmh1gQQIv4nVixwxuVuDIUIf1TVB6eVj2jrDqPHDeuxFjQ0wevQ4s6AZxeRx6xc2wRlzJJJ+ZhXW2FhbPtnszxL08fFS4l5aQ+4LCx4YAiw+lv20B62HQGzfG8TB6Gqzu73lvPG606jvCcnv/Cm91mmRk2WFqgbA+iqJshlXFJQlck7CeAot1542A5+OXfDIsy+0eoe1fCs91wWFNcH2y8N4Qgic5lN4Ma1Cr2yEu7jwJVhmnnkIPt1/uFGeZpvCqd2JW6z2HNcVJh1eBxcu4GRbj81natEMe1uoFC/bMBQuV41YMzMSE1gijvVeBxZ/Yxy0sK84MXp8Cy0o2iD993dARzurE4Mt2cqp0Xmh3KGGBCxBP7PpFYfm7z2e5Q8ZXpNWOo6/Kw78OLD6U7l9tgpWbg98W1qZp5WRuYR2s3omwKOiJ8MOh8vDFz2chLD6Uvjx/OVjBWlgPW+yi+R9vfu+goJV049+0MSx+phR7Yh7znb/fCCsX3DzTssSO9t69mmpZGzr8cyF7QeG7xCx8p9A5Gh2WmrRdB+tG1GwKwY22+/xZsC77R4fXxydGt+WEj8KCDGolWmzyfie6w3mBWx0ULJzyMN5vgHVyfXh0d9E3ZoG+ceU5sNTEoMHwmuZjsJpiibWvuu19Fcc4ftHrhhzWt8dhJTOl7AFpJa/2PAfWXkXmTTbDr4NVF2PCa4B1UUlmlrmHL4pVBtbRBljJHDwb3PPdQ1vAAr1bC0telOdl1YA3qDWw3HGyLUvOAR6rGL64uVId1vG2sMQ7A8ojAyywj9NVsI4/gy5Ww/quvdfD63025Ftz18D6fVuRUzPGNf/UL97D67Bu1sBy28ZeWjHxZkPyElLJjdkonW3OwFro89A5WHwL/c2Pr8fgCEW9+TUFLP6ik4QlFwY7PGbGR2L8qKQzyyMcixYVaUlYvCNOV5qWYJ1//3xx17+9PvlRFhXrxGp5x20ybXYvAyucszQlA6tkNvTX7/gJbNbCF3Gaxsn1bf/iRwaW6gx5kxabS89lPFvgNpoMrCtlPTlYraWK8SGsnM8ymzO2ElbJsn+yDCw/jTj8mGkkeb0hwgTT8v7W76NgReLFOm7WItA6lfFswRtw5TJz2fi+/+795d3R9YkoqNqAW7LOcvXiawUJFD8aJOkZWKZvx0lK1rIs12vlaUGMj1PO4YN2XMGqg70d3V3yiF+0UzGzzGaNemEenr+c+eVKrMPlrCeBZS6bwUgf9Ph2Q6bn1xB8755xqVmHRJblBeXsReUZflRNjyfPK05LZhz3Ly7PT4VX6xb6hsWPHymebOETWCWoWCeTxkaZLXd+2O6IqflpbkHd9+rVyWw67XYnjUytTNPy6l2mVIY/00ULYVm+nVpqOtzR0GYe6aK4FXz3QXuNpDvLEElhYcUmSb3Ko1Fn2kstCN9pDZ12rQGqtbIbYiFnNGy3WnEct53MmBfO8pxab159mMxmALM7mo6l7fl2T1lyCsurJ6UbaU+OFblR0h9rPng+15ubgCW8jOU1x4NqtTqYny1w3aERZ6H4XuTUQY6Te84mGErU5LLzlYKkehC0gSXArNUS0ODrGt0RGhtLN9gC9Z4s3Oh3+lSL9PCmFab+qHsW/+okLWPUmcfJ7icTHrcTtNrtIBiC+MJDxlVYvheGXqh9xUFyB8v3fT75vrxq5Yd2FHGWDkpd07Tseqs2Hp/Nx+2mWKCHAYNn/xJFHc3HielxD/8ybJZkAQTpjxj6YKdenc1mk+oADShZ7pIVi1A2KORQ/hu/iig5TM/zdC8IljocBkPH1g9CU0RHsIjrQVfSKvLtTKAVOhNuSLMqBDrgYqBNtFptfJkpbz1K/FtBtoRl5n4upcsvGeH/YlV6ElgqmCo8GL3tWp7T+gkdBtib7VSlcWV72ZeW5UfcO8dxAGG5cDFgQWG41KReWdCD+pEzbLehr/A9uzHpQHM4KHYNn/sj4ZxDHz0yiL+PVPiXvWwQfkcOQEJf4FvcicaN3qDRLnTDA9p3GIaZ759R/57bG5R0Bdg/Nh18hXGpm31ZmViE3HcQFVqA7ZV+vRF2sx5/ym/LW7xhEait9Vbt/43qzfqLtyhiRSKRSCQSiUQikUgkEolEIpFIJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJRCKRSCQSaTf9H4k49qkav83TAAAAAElFTkSuQmCC">
</head>
<body>
<h1> What to Watch on Netflix Now! </h1>

<h2> Movies by Genre </h2>
<h2> ${response.map (genre=> `
<li>
<a href='/genres/${genre.id}'> ${genre.name} 
</li>`).join('')} </h2> 
</body>
</html>
`
        )  
    }

    catch(ex){
        console.log(ex)
    }
})


app.get('/api/genres/:id', async(req,res,next)=> {
    const {id} = req.params.id
    try {
        res.send(await Movie.findAll({ where:{ 
            include: [{ genreId: id}]
       
        }

        }));
    }

    catch(ex){
        console.log(ex)
    }
})


const init = async()=> {
    await conn.authenticate();
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> `app listens on port ${port}`)
}


init(); 