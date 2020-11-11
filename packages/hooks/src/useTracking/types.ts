export interface UseTrackingResult {
  /** The callback when user clicks on some link */
  handleResultClicked: (url: string) => void;
  /** The method used to process PosNeg token */
  consumeInteractionToken: (
    token: string,
    identifier: string,
    weight: number,
    data?: Record<string, string>,
  ) => Promise<void>;
}
