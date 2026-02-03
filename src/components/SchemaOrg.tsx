import * as ReactHelmetAsync from 'react-helmet-async';
const { Helmet } = ReactHelmetAsync;

interface SchemaOrgProps {
    data: any;
}

export const SchemaOrg = ({ data }: SchemaOrgProps) => {
    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(data)}
            </script>
        </Helmet>
    );
};
