"use client"

import { MetaData } from "@/hooks/use-metadata"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { copyToClipboard } from "@/lib/utils"
import { Copy } from "lucide-react"

interface MetadataTabsProps {
  metadata: MetaData
  url: string
}

export function BasicMetadata({ metadata }: { metadata: MetaData }) {
  const basicFields = [
    { label: "Title", value: metadata.title },
    { label: "Description", value: metadata.description },
    { label: "Language", value: metadata.language },
    { label: "Charset", value: metadata.charset },
    { label: "Viewport", value: metadata.viewport },
    { label: "Canonical", value: metadata.canonical },
    { label: "Favicon", value: metadata.favicon },
    { label: "Generator", value: metadata.generator },
    { label: "Theme Color", value: metadata.themeColor },
    { label: "Robots", value: metadata.robots },
  ]

  return (
    <div className="space-y-4">
      {basicFields.map((field) => (
        <div key={field.label} className="border-b border-border pb-3">
          <div className="text-xs text-muted-foreground mb-1">{field.label}</div>
          <div className="text-sm break-all">{field.value || <span className="text-muted-foreground">Not set</span>}</div>
        </div>
      ))}
    </div>
  )
}

export function OpenGraphMetadata({ metadata }: { metadata: MetaData }) {
  const ogFields = [
    { label: "og:title", value: metadata.ogTitle },
    { label: "og:description", value: metadata.ogDescription },
    { label: "og:image", value: metadata.ogImage },
    { label: "og:type", value: metadata.ogType },
    { label: "og:url", value: metadata.ogUrl },
    { label: "og:site_name", value: metadata.ogSiteName },
    { label: "og:locale", value: metadata.ogLocale },
  ]

  return (
    <div className="space-y-4">
      {ogFields.map((field) => (
        <div key={field.label} className="border-b border-border pb-3">
          <div className="text-xs text-muted-foreground mb-1">{field.label}</div>
          <div className="text-sm break-all">{field.value || <span className="text-muted-foreground">Not set</span>}</div>
        </div>
      ))}
    </div>
  )
}

export function TwitterMetadata({ metadata }: { metadata: MetaData }) {
  const twitterFields = [
    { label: "twitter:card", value: metadata.twitterCard },
    { label: "twitter:title", value: metadata.twitterTitle },
    { label: "twitter:description", value: metadata.twitterDescription },
    { label: "twitter:image", value: metadata.twitterImage },
    { label: "twitter:site", value: metadata.twitterSite },
    { label: "twitter:creator", value: metadata.twitterCreator },
  ]

  return (
    <div className="space-y-4">
      {twitterFields.map((field) => (
        <div key={field.label} className="border-b border-border pb-3">
          <div className="text-xs text-muted-foreground mb-1">{field.label}</div>
          <div className="text-sm break-all">{field.value || <span className="text-muted-foreground">Not set</span>}</div>
        </div>
      ))}
    </div>
  )
}

export function ImagesMetadata({ metadata }: { metadata: MetaData }) {
  const images = [
    { label: "OG Image", url: metadata.ogImage },
    { label: "Twitter Image", url: metadata.twitterImage },
    { label: "Favicon", url: metadata.favicon },
    { label: "Icon", url: metadata.icon },
  ].filter((img) => img.url)

  if (images.length === 0) {
    return <div className="text-sm text-muted-foreground">No images found</div>
  }

  return (
    <div className="space-y-6">
      {images.map((image) => (
        <div key={image.label} className="border-b border-border pb-4">
          <div className="text-xs text-muted-foreground mb-2">{image.label}</div>
          <div className="text-sm break-all mb-2">{image.url}</div>
          {image.url && (
            <div className="mt-2">
              <img
                src={image.url}
                alt={image.label}
                className="max-w-full h-auto rounded border border-border"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export function RawMetadata({ metadata }: { metadata: MetaData }) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Raw Metadata</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              copyToClipboard(JSON.stringify(metadata, null, 2))
            }}
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy JSON
          </Button>
        </div>
        <div className="bg-muted rounded-lg p-4 overflow-auto max-h-[600px]">
          <pre className="text-xs">
            {JSON.stringify(metadata, null, 2)}
          </pre>
        </div>
      </div>
    </Card>
  )
}
