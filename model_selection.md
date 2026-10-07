# PivotWatch model selection for the presentation

Decision prepared 7 October 2026. [Architecture](architecture.md) · [Data acquisition](data_acquisition.md).

**Present Isolation Forest as the proposed core model. Present Prithvi-EO-2.0-tiny-TL as the future fine-tuning candidate once local labels exist.** If discussing an already fine-tuned satellite model, the IBM/NASA Prithvi crop-classification checkpoint is a concrete reference, but its task and label set do not fit the core fault-inspection problem. No reviewed checkpoint establishes Saudi pivot-fault diagnosis.

This model decision was first prepared for a presentation-only deliverable. A local synthetic-data MVP has since been implemented; it fits Isolation Forest on the demo fixture but does not process satellite imagery or establish local accuracy. Training/downloading optional Prithvi weights remains unnecessary for the current MVP. Model cards and source documentation were inspected, but weights have not been downloaded and inference speed or local accuracy has not been measured. The implementation notes below describe the intended real-data prototype. See [MVP documentation](MVP.md) for the implementation status.

## Candidate comparison

| Model | Training status and task | Decision for PivotWatch |
|---|---|---|
| scikit-learn `IsolationForest` | Unsupervised estimator fitted on our feature table; no external pretrained weights | **Core model.** Low operational complexity, suitable for ranking unusual feature combinations when physical-fault labels are scarce. Must demonstrate a real fit and unseen-date score. [Official API](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.IsolationForest.html). |
| `ibm-nasa-geospatial/Prithvi-EO-1.0-100M-multi-temporal-crop-classification` | Existing fine-tuned 100M crop/land-cover segmentation checkpoint, Apache-2.0 | **Optional existing fine-tuned demonstration.** Its 13-class label set has no potato class or irrigation-fault classes. Show crop-context output with explicit domain-transfer limits, preferably first on its supplied example. [Model card](https://huggingface.co/ibm-nasa-geospatial/Prithvi-EO-1.0-100M-multi-temporal-crop-classification). |
| `ibm-nasa-geospatial/Prithvi-EO-2.0-tiny-TL` | Pretrained 5M EO backbone with temporal/location inputs; Apache-2.0 | **First custom-adaptation candidate.** A manageable starting point for feature extraction or a new reviewed-label task. It is not already fine-tuned for PivotWatch. [Model card](https://huggingface.co/ibm-nasa-geospatial/Prithvi-EO-2.0-tiny-TL). |
| `ibm-nasa-geospatial/Prithvi-EO-2.0-300M` | Larger pretrained EO backbone | Defer until a smaller-model experiment shows a useful signal and GPU time is available. Size alone does not establish local utility. [Model card](https://huggingface.co/ibm-nasa-geospatial/Prithvi-EO-2.0-300M). |
| `crop-classification/messis` | Prithvi adaptation for Swiss crop classification using ZueriCrop 2.0 | Research comparison only; its training geography and crop task differ from Saudi fault inspection. [Author model card](https://huggingface.co/crop-classification/messis). |
| IrrMap benchmark models | Irrigation-method classification on the authors' dataset | Relevant to mapping irrigation methods, not prioritizing physical faults. Repository provides training code; a ready Saudi fault checkpoint was not established. [Author repository](https://github.com/Nibir088/IrrMap). |

Calling Isolation Forest fitting “fine-tuning” would be inaccurate. Loading an existing crop checkpoint is inference using a model fine-tuned by its authors. Training only a new classifier over a frozen encoder is a probe/head-training experiment; updating pretrained weights is fine-tuning. Use those labels accurately in the pitch.

## Core model specification

Proposed initial configuration: `IsolationForest(n_estimators=200, max_samples="auto", contamination="auto", random_state=42, n_jobs=-1)`. The API's `score_samples` assigns lower values to more unusual observations; define the displayed raw anomaly score as its negative so larger consistently means more unusual. Select an application threshold separately on development/calibration data; do not treat the estimator's default cutoff as a calibrated failure threshold. [scikit-learn API](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.IsolationForest.html).

Fit only valid rows from comparable crop stages, limiting each pivot/date's contribution so a large field does not dominate. Save the exact feature ordering and development rows. The minimum-history gate is a demo availability check; hundreds of neighboring cells still share weather, dates and management and are not independent examples.

Freeze thresholds before the held-out period. An initial upper-tail threshold on development anomaly scores is an engineering starting point; choose the tail fraction against development alert burden and available reviewed cases. A separate observed-deficit/decline condition prevents unusual greening from being described as stress. The architecture's validity and persistence gates apply afterward.

The comparator uses peer NDVI deficit with a fixed development-selected threshold and the same persistence, freshness and context requirements. For a labeled evaluation, compare both ranking methods at the same task budget after spatial merging and report precision/recall and denominators. Without independent labels, report ranked examples, alert counts and gate behavior; do not report fault-detection accuracy.

## Optional existing fine-tuned model

Use the canonical Prithvi-EO-1.0 crop checkpoint above and its [official preprocessing configuration](https://github.com/NASA-IMPACT/hls-foundation-os/blob/main/configs/multi_temporal_crop_classification.py). The documented input is 224 × 224 pixels with 18 channels: three dates, each with blue, green, red, narrow NIR, SWIR1 and SWIR2. Its training inputs are HLS with CDL-derived labels. Follow the checkpoint's normalization, date ordering and inference configuration exactly. [Model card](https://huggingface.co/ibm-nasa-geospatial/Prithvi-EO-1.0-100M-multi-temporal-crop-classification).

Acquire a separate HLS S30 input branch and retain quality information. Do not feed an RGB screenshot, a one-date NDVI image, or duplicate one acquisition three times and call it a temporal demonstration. A 224-pixel chip at 30 m spans 6.72 km; display that context extent honestly and overlay the smaller pivot boundary.

For a Saudi experiment, the output is exploratory and must not set the potato calendar or dispatch gates. Failure to represent the target crop is a concrete limitation, not something solved by relabeling the model's output. The core field geometry and crop context remain independently supplied.

Pin the checkpoint revision, inference code commit and environment after a successful local run. Prefer cached outputs for presentation reliability; clearly identify precomputed inference. If package compatibility or runtime becomes a blocker, omit the extension and retain the complete anomaly workflow. Published model results do not become our demo's measured results.

## If we train a custom model

The first useful supervised target would be **a reviewed spatial crop-pattern label**, such as persistent localized decline versus explained management change. Equipment-cause classification should wait for sufficient independent physical inspections. Fine-tuning on NDVI-generated pseudo-labels mainly learns the NDVI rule; it does not establish fault understanding.

Recommended experiment order:

1. Collect reviewed examples across distinct pivots and seasons; keep unknown/inconclusive labels explicit. Reserve entire fields and later dates for evaluation, avoiding overlapping chips across splits.
2. Establish the index-feature baseline and its inspection utility.
3. Extract frozen Prithvi tiny features with checkpoint-compatible inputs and compare a small trained head against that baseline. Keep this at an appropriate spatial scale: coarse patch embeddings do not identify individual sprinkler positions.
4. Only if this adds value, unfreeze selected encoder blocks or evaluate an adapter and train on the same splits. Choose learning rate and stopping point on development data, never on the final test set.
5. Report task definition, label provenance, independent field count, class balance, confusion counts and uncertainty. Promote a new model only after it improves the relevant metric without breaking abstention behavior.

The tiny checkpoint's backbone is much smaller than the 100M/300M alternatives, which motivates trying it first; actual RAM/VRAM needs depend on chip size, temporal depth, batch size, precision and training strategy. No GPU memory or runtime guarantee is made without a measured run. Keep neural dependencies in a separate environment from the working core demo.

## Future prototype selection by available resources

| Resources | Use |
|---|---|
| Laptop CPU, limited event time | Cached Sentinel-2 → feature table → fitted Isolation Forest → inspection workflow |
| GPU/cloud and preparation time | Complete core plus cached Prithvi crop-checkpoint inference, labeled as an optional context experiment |
| GPU and enough reviewed local labels | Core plus an evaluated tiny-backbone adaptation; report it as experimental until held-out results support promotion |

No LLM is needed for the inspection decision. Fixed Arabic/English templates can express the recorded evidence and diagnostic question consistently. Fine-tuning a language model would not solve the missing satellite-to-fault ground truth.
