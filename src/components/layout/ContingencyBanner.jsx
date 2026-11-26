import { WifiOff } from "lucide-react";
import useContingency from "../../hooks/useContingency";
import { disableContingency } from "../../services/contingency";

// Aviso fixo enquanto o app mostra os dados locais em vez da API
function ContingencyBanner() {
    const active = useContingency();
    if (!active) return null;

    function backToApi() {
        disableContingency();
        window.location.reload(); // recarrega tudo direto da API
    }

    return (
        <div className="contingency-banner" role="status">
            <div className="container contingency-banner__inner">
                <p>
                    <WifiOff size={18} strokeWidth={1.75} aria-hidden="true" />
                    <span>
                        <strong>Modo contingência:</strong> a API está indisponível e você está
                        vendo os dados de demonstração locais. Login, cadastro e favoritos
                        precisam da API.
                    </span>
                </p>
                <button type="button" className="btn btn--small" onClick={backToApi}>
                    Voltar a usar a API
                </button>
            </div>
        </div>
    );
}

export default ContingencyBanner;
