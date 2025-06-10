import HeroSection from '@/modules/core/components/HeroSection';
import { urls } from '@/modules/core/utils/urls';
import { Trans } from '@lingui/react/macro';
import { useMatches } from '@tanstack/react-router';
import { profileNavLinks } from '../../utils/flags';

export default function ProfileHeroSection() {
    const matches = useMatches();
    const activeRoute = matches[matches.length - 1];

    const activeNavLink = profileNavLinks.find(
        (link) => link.route === activeRoute.routeId
    );

    const breadcrumbs = [
        { label: <Trans>Home</Trans>, path: urls.home },
        { label: <Trans>Profile</Trans>, path: urls.profile.index },
    ];

    if (activeNavLink?.path !== urls.profile.index) {
        breadcrumbs.push({
            label: activeNavLink?.name || <Trans>Profile</Trans>,
            path: activeNavLink?.path!,
        });
    }

    return (
        <HeroSection
            title={activeNavLink?.name || <Trans>Profile</Trans>}
            breadcrumbs={breadcrumbs}
        />
    );
}
