const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');

const { User } = require("./models/User");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connect'))
.catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World?'));

app.post('/register', (req, res) => {
    //회원가입 정보 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })
});

app.post('/login', (req, res) => {
    //1. 요청 이메일 데이터베이스에서 찾기
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

        //2. 이메일-비밀번호 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
            
            //3. token 생성
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                //토큰 저장? 쿠키, 로컬스토리지
                res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id })
            })                        
        })
    })
})

app.listen(port, () => console.log(`Example app ${port}!`));