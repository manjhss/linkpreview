"use client"

import { useCallback, useState } from "react"
import { SettingsProvider } from "@/context/settings-context"
import { useMetadata } from "@/hooks/use-metadata"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { UrlInput } from "@/components/url-input"
import {
  TelegramPreview,
  DiscordPreview,
  SlackPreview,
  XPreview,
  FacebookPreview,
  LinkedInPreview,
  WhatsAppPreview,
  Platform,
} from "@/components/previews"
import { ScoreDisplay } from "@/components/score-display"
import {
  BasicMetadata,
  OpenGraphMetadata,
  TwitterMetadata,
  ImagesMetadata,
  RawMetadata,
} from "@/components/metadata-tabs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, AlertCircle, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatUrl } from "@/lib/cache"

const EXAMPLE_URLS = ["vercel.com", "poke.com", "opencode.ai"]

function LinkPreviewContent() {
  const {
    url,
    setUrl,
    metadata,
    loading,
    error,
    fetchMetadata,
    clear,
    refresh,
  } = useMetadata()

  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null)
  const [localError, setLocalError] = useState<string>("")

  const handleSubmit = useCallback(
    (urlToFetch: string) => {
      setLocalError("")
      fetchMetadata(urlToFetch)
    },
    [fetchMetadata],
  )

  const handleExampleClick = useCallback(
    (exampleUrl: string) => {
      const normalized = formatUrl(exampleUrl)
      setUrl(normalized)
      handleSubmit(normalized)
    },
    [setUrl, handleSubmit],
  )

  useKeyboardShortcuts({
    onPlatformSelect: setSelectedPlatform,
    onClear: clear,
    onRefresh: refresh,
    onFocusInput: () => {
      const input = document.querySelector('input[type="url"]') as HTMLInputElement
      input?.focus()
    },
  })

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">
          <div className="space-y-3">
            <h1 className="text-6xl font-serif italic text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>metadata</h1>
            <p className="text-lg text-foreground/80">
              Inspect how your links appear on social platforms.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-foreground/70">Enter URL</label>
              <UrlInput
                url={url}
                setUrl={setUrl}
                onSubmit={handleSubmit}
                loading={loading}
                error={localError || error}
                onClear={clear}
                onRefresh={refresh}
              />
            </div>

            {!metadata && !loading && !error && !localError && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-wide text-foreground/70">TRY THESE</p>
                  <div className="flex flex-wrap gap-4">
                    {EXAMPLE_URLS.map((exampleUrl) => (
                      <button
                        key={exampleUrl}
                        onClick={() => handleExampleClick(exampleUrl)}
                        className="flex items-center gap-1 text-foreground hover:text-foreground/70 transition-colors"
                      >
                        <span>›</span>
                        <span>{exampleUrl}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-sm uppercase tracking-wide text-foreground/70">LOCALHOST</p>
                  <ChevronDown className="w-4 h-4 text-foreground/70" />
                </div>
              </div>
            )}
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Fetching metadata...</p>
            </div>
          )}

          {(error || localError) && !loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-4">
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Unable to fetch preview</h2>
              <p className="text-muted-foreground text-center max-w-md">
                {error || localError}
              </p>
              <Button onClick={clear} variant="outline" className="mt-4">
                Try another URL
              </Button>
            </div>
          )}

          {metadata && !loading && !error && !localError && (
            <Tabs defaultValue="score" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                <TabsTrigger
                  value="score"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                  SCORE
                </TabsTrigger>
                <TabsTrigger
                  value="previews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                  PREVIEWS
                </TabsTrigger>
                <TabsTrigger
                  value="basic"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                  BASIC
                </TabsTrigger>
                <TabsTrigger
                  value="opengraph"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                  OPEN GRAPH
                </TabsTrigger>
                <TabsTrigger
                  value="x"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                  X
                </TabsTrigger>
                <TabsTrigger
                  value="images"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                  IMAGES
                </TabsTrigger>
                <TabsTrigger
                  value="raw"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                  RAW
                </TabsTrigger>
              </TabsList>

              <TabsContent value="score" className="mt-8">
                <ScoreDisplay metadata={metadata} />
              </TabsContent>

              <TabsContent value="previews" className="mt-8">
                <div className="grid gap-6">
                  {(selectedPlatform === null || selectedPlatform === "telegram") && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Telegram</h3>
                      <TelegramPreview metadata={metadata} url={url} />
                    </div>
                  )}
                  {(selectedPlatform === null || selectedPlatform === "discord") && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Discord</h3>
                      <DiscordPreview metadata={metadata} url={url} />
                    </div>
                  )}
                  {(selectedPlatform === null || selectedPlatform === "slack") && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Slack</h3>
                      <SlackPreview metadata={metadata} url={url} />
                    </div>
                  )}
                  {(selectedPlatform === null || selectedPlatform === "x") && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">X</h3>
                      <XPreview metadata={metadata} url={url} />
                    </div>
                  )}
                  {(selectedPlatform === null || selectedPlatform === "facebook") && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Facebook</h3>
                      <FacebookPreview metadata={metadata} url={url} />
                    </div>
                  )}
                  {(selectedPlatform === null || selectedPlatform === "linkedin") && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">LinkedIn</h3>
                      <LinkedInPreview metadata={metadata} url={url} />
                    </div>
                  )}
                  {(selectedPlatform === null || selectedPlatform === "whatsapp") && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">WhatsApp</h3>
                      <WhatsAppPreview metadata={metadata} url={url} />
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="basic" className="mt-8">
                <BasicMetadata metadata={metadata} />
              </TabsContent>

              <TabsContent value="opengraph" className="mt-8">
                <OpenGraphMetadata metadata={metadata} />
              </TabsContent>

              <TabsContent value="x" className="mt-8">
                <TwitterMetadata metadata={metadata} />
              </TabsContent>

              <TabsContent value="images" className="mt-8">
                <ImagesMetadata metadata={metadata} />
              </TabsContent>

              <TabsContent value="raw" className="mt-8">
                <RawMetadata metadata={metadata} />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  )
}

export default function Page() {
  return (
    <SettingsProvider>
      <LinkPreviewContent />
    </SettingsProvider>
  )
}
