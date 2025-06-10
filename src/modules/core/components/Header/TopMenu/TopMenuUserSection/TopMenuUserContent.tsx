import { Trans } from '@lingui/react/macro';

import { Button } from '@/components/ui/button';
import useUserStore from '@/modules/core/stores/userStore';
import { urls } from '@/modules/core/utils/urls';
import Link from '../../../LocalizedLink';
import TopMenuUserDropMenu from './TopMenuUserDropMenu';

export default function TopMenuUserContent() {
    useUserStore.use.role();
    const isCustomer = useUserStore.use.isCustomer();

    return (
        <>
            {isCustomer() ? (
                <TopMenuUserDropMenu />
            ) : (
                <div className='flex items-center space-x-2'>
                    <Button variant='outline' size='sm' asChild>
                        <Link to={urls.auth.login}>
                            <Trans>Login</Trans>
                        </Link>
                    </Button>
                    <Button size='sm' asChild>
                        <Link to={urls.auth.register}>
                            <Trans>Register</Trans>
                        </Link>
                    </Button>
                </div>
            )}
        </>
    );
}
