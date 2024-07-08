/**
 * Ad moderation page - SPA - client side functions
 * @type {{fetchAndDisplayAds: ((function(): Promise<void>)|*)}}
 */
const adModeration = (function () {
    const adsContainer = document.getElementById("ads-container");

    /**
     * Fetch all ads from API and send them to apply to the page
     * @returns {Promise<void>}
     */
    const fetchAndDisplayAds = async () => {
        const spinner = document.getElementById("spinner");
        spinner.classList.toggle('d-none');

        try {
            const response = await fetch('/adModeration/ads');
            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error);
            }
            const ads = await response.json();
            updateAdsUI(ads);
        } catch (err) {
            console.log(err.message);
            showError(err.message);
        } finally {
            spinner.classList.toggle('d-none');
        }
    };

    /**
     * Update page with fetched ads
     * @param ads
     */
    const updateAdsUI = (ads) => {
        // Start the row before mapping over ads
        let htmlContent = '<div class="row">';

        // Map over ads to create columns and cards
        htmlContent += ads.map(ad => `
        <div class="col-md-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${ad.title}</h5>
                    <p class="card-text">${ad.description}</p>
                    <p class="card-text">Price: ${ad.price}₪</p>
                    <p class="card-text">Contact: ${ad.phoneNumber}</p>
                    <p class="card-text">Email: ${ad.email}</p>
                    <p class="card-text">Posted: ${new Date(ad.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <button class="btn btn-primary approve-btn ${ad.approved ? 'd-none' : ''}" data-ad-id="${ad.id}">Approve</button>
                    <button class="btn btn-danger delete-btn" data-ad-id="${ad.id}">Delete</button>
                </div>
            </div>
        </div>
    `).join('');

        // Close the row after all ads have been added
        htmlContent += '</div>';

        // Set the innerHTML of the adsContainer to the generated content
        adsContainer.innerHTML = htmlContent;

        // Attach event listeners to buttons
        attachEventListeners();
    };

    /**
     * Show error with modal
     * @param errorMessage
     */
    const showError = (errorMessage) => {
        const errorMessageElement = document.getElementById("error-message");
        errorMessageElement.textContent = errorMessage;

        const errorModalElem = document.getElementById('errorModal');
        const errorModal = new bootstrap.Modal(errorModalElem, {});
        errorModal.show();
    };

    /**
     * Show Success with modal
     * @param modalId
     */
    const showSuccessModal = (modalId) => {
        const successModalElem = document.getElementById(modalId);
        const successModal = new bootstrap.Modal(successModalElem, {});
        successModal.show();
    };

    /**
     * Event listeners for approve and delete buttons
     */
    const attachEventListeners = () => {
        document.querySelectorAll('.approve-btn').forEach(button => {
            button.addEventListener('click', function () {
                approveAd(this.getAttribute('data-ad-id'));
            });
        });
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function () {
                deleteAd(this.getAttribute('data-ad-id'));
            });
        });
    };

    /**
     * Request for ad approval from server
     * @param adId
     * @returns {Promise<void>}
     */
    const approveAd = async (adId) => {
        const successApproveId = 'successApproveModal';
        try {
            const response = await fetch(`/adModeration/${adId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errMsg = await response.text();
                throw new Error(errMsg);
            }

            showSuccessModal(successApproveId);
            fetchAndDisplayAds(); // Refresh the list of ads after approval
        } catch (error) {
            showError(error.message); // Display the custom server error message
        }
    };

    /**
     * Request for ad removal from server
     * @param adId
     * @returns {Promise<void>}
     */
    const deleteAd = async (adId) => {
        const successDeleteId = 'successDeleteModal';
        try {
            const response = await fetch(`/adModeration/${adId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errMsg = await response.text();
                throw new Error(errMsg);
            }

            showSuccessModal(successDeleteId);
            fetchAndDisplayAds(); // Refresh the list of ads after deletion
        } catch (error) {
            showError(error.message);
        }
    };

    return {
        fetchAndDisplayAds: fetchAndDisplayAds
    }
})();

// Fetch all ads as soon as DOM content loaded
document.addEventListener('DOMContentLoaded', adModeration.fetchAndDisplayAds);