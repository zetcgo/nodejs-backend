module.exports = class Paginator {
    static PAGES_PER_RANGE = 10;

    constructor(totalItemsCount, itemsPerPage, initialPage) {
        this.totalItemsCount = totalItemsCount;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = initialPage;
    }

    get totalPagesCount() {
        return Math.ceil(this.totalItemsCount / this.itemsPerPage);
    }

    get totalRangesCount() {
        return Math.ceil(this.totalPagesCount / Paginator.PAGES_PER_RANGE);
    }

    get previousRange() {
        const currentRangeIndex = Math.ceil(this.currentPage / Paginator.PAGES_PER_RANGE);
        if (currentRangeIndex <= 1) return null;
        const beginPage = (currentRangeIndex - 2) * Paginator.PAGES_PER_RANGE + 1;
        return [...Array(Paginator.PAGES_PER_RANGE)].map((_, i) => beginPage + i);
    }

    get currentRange() {
        const currentRangeIndex = Math.ceil(this.currentPage / Paginator.PAGES_PER_RANGE);
        const beginPage = (currentRangeIndex - 1) * Paginator.PAGES_PER_RANGE + 1;
        const length = Math.min(Paginator.PAGES_PER_RANGE, this.totalPagesCount - beginPage + 1);
        return [...Array(length)].map((_, i) => beginPage + i);
    }

    get nextRange() {
        const currentRangeIndex = Math.ceil(this.currentPage / Paginator.PAGES_PER_RANGE);
        if (currentRangeIndex >= this.totalRangesCount) return null;
        const beginPage = currentRangeIndex * Paginator.PAGES_PER_RANGE + 1;
        const length = Math.min(Paginator.PAGES_PER_RANGE, this.totalPagesCount - beginPage + 1);
        return [...Array(length)].map((_, i) => beginPage + i);
    }
};
