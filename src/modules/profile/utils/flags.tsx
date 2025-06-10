import { urls } from '@/modules/core/utils/urls';
import { Trans } from '@lingui/react/macro';
import { Lock, MapPin, User } from 'lucide-react';
import { UserGender } from './types';

export const profileNavLinks = [
    {
        name: <Trans>Profile</Trans>,
        path: urls.profile.index,
        icon: <User className='size-4' />,
        route: '/$locale/profile/',
    },
    {
        name: <Trans>Change Password</Trans>,
        path: urls.profile.changePassword,
        icon: <Lock className='size-4' />,
        route: '/$locale/profile/change-password',
    },
    {
        name: <Trans>Addresses</Trans>,
        path: urls.profile.addresses,
        icon: <MapPin className='size-4' />,
        route: '/$locale/profile/addresses',
    },
];

export const userGenders = Object.values(UserGender);

export const userMenuLinks = [
    {
        url: urls.profile.index,
        label: <Trans>Profile</Trans>,
        icon: <User className='size-4 me-2' />,
    },
    {
        url: urls.profile.changePassword,
        label: <Trans>Change Password</Trans>,
        icon: <Lock className='size-4 me-2' />,
    },
    {
        url: urls.profile.addresses,
        label: <Trans>Addresses</Trans>,
        icon: <MapPin className='size-4 me-2' />,
    },
];
