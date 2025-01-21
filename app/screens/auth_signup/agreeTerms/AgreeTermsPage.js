import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import TermsAndConditionsBox from './components/TermsAndConditionsBox';
import AgreeTermsButton from './components/AgreeTermsButton';

export default function AgreeTermsPage() {
    const [agreed1, setAgreed1] = useState(false);
    const [agreed2, setAgreed2] = useState(false);

    const handleToggle1 = (isChecked) => {
        setAgreed1(isChecked);
    };

    const handleToggle2 = (isChecked) => {
        setAgreed2(isChecked);
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }} style={{ backgroundColor: '#fff' }}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    paddingLeft: 30,
                    paddingRight: 30,
                    justifyContent: 'center',
                }}
            >
                <TermsAndConditionsBox
                    content="제 1조. 환불 정책 및 입금 동의서환불 정책 및 입금동의서환불 정책 및 입금 동의서환불 정책 및 입금 동의서 제2조.환불 정책 및 입금 동의서환불 정책 및 입금 동의서환불 정책 및 입금 동의서환불 정책 및 입금 동의서환불 정책 및 입금 동의서환불 정책 및 입금 동의서 제3조.환불 정책 및 입금 동의서환불 정책 및 입금 동의서환불 정책 및 입금 동의서환불 정책 및 입금 동의서 제 4조. 환불 정책 및 입금 동의서환불 정책 및 입금"
                    content_box="서비스 이용약관 동의"
                    onToggle={handleToggle1}
                />
                <TermsAndConditionsBox
                    content="제 1조. 환불 정책 및 입금 동의서환불 정책 및 입금동의서환불 정책 및 입금 동의서환불 정책 및 입금 동의서 제2조.환불 정책 및 입금 동의서환불 정책 및 입금 동의서환불 정책 및 입금 동의서환불 정책 및 입금 동의서환불 정책 및 입금 동의서환불 정책 및 입금 동의서 제3조.환불 정책 및 입금 동의서환불 정책 및 입금 동의서환불 정책 및 입금 동의서환불 정책 및 입금 동의서 제 4조. 환불 정책 및 입금 동의서환불 정책 및 입금 "
                    content_box="개인정보 수집 및 이용 동의"
                    onToggle={handleToggle2}
                />
                <AgreeTermsButton isChecked1={agreed1} isChecked2={agreed2} />
            </View>
        </ScrollView>
    );
}
