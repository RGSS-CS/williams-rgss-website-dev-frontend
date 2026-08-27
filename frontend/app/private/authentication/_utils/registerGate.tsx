import { redirect } from 'next/navigation';
import { verifyJoinCode } from '@/app/private/authentication/_utils/verifyJoinCode';
import SignupFormClient from '@/app/private/authentication/register/[client]/_components/signupForm';

type RegisterGateProps = {
    params: Promise<{ client: string }>;
    showCaptcha: boolean;
};

export default async function RegisterGate({ params, showCaptcha }: RegisterGateProps) {
    const { client } = await params;
    const code = decodeURIComponent(client);

    const isValid = await verifyJoinCode(code);
    if (!isValid) {
        redirect('/private/authentication?error=invalid_code');
    }

    return <SignupFormClient showCaptcha={showCaptcha} code={code} />;
}
