import { redirect } from 'next/navigation';
import { verifyCode } from '@/app/private/authentication/register/_utils/verifyCode';
export const instant = false;

type RegisterEntryProps = {
    searchParams: Promise<{ rel?: string }>;
};

export default async function RegisterRedirectClient({ searchParams }: RegisterEntryProps) {
    const { rel } = await searchParams;
    const code = rel?.trim();

    if (!code) {
        redirect('/private/authentication?error=missing_code');
    }

    const isValid = await verifyCode(code);
    if (!isValid) {
        redirect('/private/authentication?error=invalid_code');
    }

    redirect(`/private/authentication/register/${encodeURIComponent(code)}`);
}
