import { useState } from 'react';

// 회원가입 페이지에서 사용하는 상태, 로직 따로 관리
const useSignUpForm = (navigation) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [region, setRegion] = useState('');
    const [phone, setPhone] = useState('');
    const [authNumber, setAuthNumber] = useState(''); // 인증번호
    const [isAuthVerified, setIsAuthVerified] = useState(false); // 인증 완료 여부
    const [authCodeValid, setAuthCodeValid] = useState(false); // 인증 코드 유효 상태
    const [isIdDuplicate, setIsIdDuplicate] = useState(false);
    const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);
    const [timer, setTimer] = useState(0); // 타이머 상태
    const [intervalId, setIntervalId] = useState(null); // 타이머 ID
    const [confirmationVisible, setConfirmationVisible] = useState(false); // 확인 팝업 노출 여부

    // 비밀번호 유효성 검사
    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };
    // 회원가입 버튼 클릭 시 실행되는 함수
    const handleSignUp = () => {
        setConfirmationVisible(true);
        // if (id.trim() === '' || password.trim() === '' || confirmPassword.trim() === '' || nickname.trim() === '' || region.trim() === '') {
        //     alert('모든 필드를 입력하세요.');
        //     return;
        // }

        // if (!validatePassword(password)) {
        //     alert('비밀번호는 특수기호, 대 소문자, 숫자를 포함하여 8자 이상이어야 합니다.');
        //     return;
        // }

        // if (password !== confirmPassword) {
        //     alert('비밀번호가 일치하지 않습니다.');
        //     return;
        // }

        // 실제 회원가입 로직을 구현하면 됩니다.
        console.log('회원가입 성공');
    };

    // ID 중복 확인 로직
    const checkDuplicateId = () => {
        console.log('ID 중복 확인');
        setIsIdDuplicate(true);
    }

    // 닉네임 중복 확인 로직
    const checkDuplicateNickname = () => {
        console.log('닉네임 중복 확인');
        setIsNicknameDuplicate(true);
    }

    // 지역 검색 로직
    const searchRegion = () => {
        console.log('지역 검색');
    }

    // 인증번호 요청 버튼 클릭 시 실행되는 함수
    const requestAuth = async () => {
        console.log('인증요청');
        // const success = await requestAuthCode(phone);
        // if (success) {
        setAuthCodeValid(true);
        alert('인증 코드 요청 성공', '휴대폰으로 인증 코드를 보냈습니다.');
        startTimer();
        // } else {
        // Alert.alert('인증 코드 요청 실패', '휴대폰 번호를 다시 확인해주세요.');
        // }
    };

    // 인증번호 확인 로직
    const verifyAuth = async () => {
        if (!authCodeValid) {
            alert('인증 실패', '인증 코드가 만료되었습니다. 다시 요청하세요.');
            return;
        }
        if (authNumber === '1234') {
            console.log('인증 확인');
            // const success = await verifyAuthCode(phone, authNumber);
            // if (success) {
            setIsAuthVerified(true);
            clearInterval(intervalId); // 타이머 종료
            alert('인증 성공', '휴대폰 인증이 완료되었습니다.');
            // } else {
            // alert('인증 실패', '인증번호가 일치하지 않습니다.');
            // }
        } else {
            alert('인증 실패', '인증번호가 일치하지 않습니다.');
        }
    };

    // 타이머 관련 함수
    const startTimer = () => {
        setTimer(300); // 5분(300초) 타이머 설정
        const id = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(id);
                    setAuthCodeValid(false);
                    alert('인증 코드 만료', '인증 코드가 만료되었습니다. 다시 요청하세요.');
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
        setIntervalId(id);
    };

    return {
        id, password, confirmPassword, nickname, region, phone, authNumber,
        setId, setPassword, setConfirmPassword, setNickname, setRegion, setPhone, setAuthNumber,
        handleSignUp, checkDuplicateId, checkDuplicateNickname, searchRegion,
        requestAuth, verifyAuth, isAuthVerified, timer, confirmationVisible, setConfirmationVisible
    };
};

export default useSignUpForm;
