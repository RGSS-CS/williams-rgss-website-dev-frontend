import { getManagementSettings } from "@/app/_lib/site-management";
import { isCaptchaEnabledFor } from "@/app/_utils/checkCaptchaEnabled";
import RegisterGate from "@/app/private/authentication/register/_utils/verifyCode";
import { Suspense } from "react";

type SignupFormProps = {
    params: Promise<{ api: string }>;
};

export default async function SignupForm({ params }: SignupFormProps) {
    const management = await getManagementSettings();

    return (
        <main className='registrationPage'>
            <div className='registrationShell'>
                <Suspense fallback={<div></div>}>
                    <RegisterGate params={params} showCaptcha={isCaptchaEnabledFor(management, "REGISTER")} />
                </Suspense>
            </div>
        </main>
    );
}
