"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, MessageSquare, Hash, UserCircle, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";

const fetchPost = async (id: string | string[]) => {
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
};

const fetchComments = async (postId: string | string[]) => {
  const res = await fetch(`https://dummyjson.com/posts/${postId}/comments`);
  if (!res.ok) throw new Error("Failed to fetch comments");
  const data = await res.json();
  return data.comments;
};

export default function PostView() {
  const { id } = useParams();
  const [isVisible, setIsVisible] = useState(true);

  const { data: post, isLoading: postLoading, error: postError } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id as string),
    enabled: !!id,
  });

  const { 
  mutate: getComments, 
  data: comments, // This will be the array of comments once fetched
  isPending: commentsLoading 
} = useMutation({
  mutationFn: () => fetchComments(id as string),
  onSuccess: () => {
    setIsVisible(true);
  },
});

  if (postLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (postError) return <div className="text-destructive p-6 font-mono bg-destructive/10 rounded-lg border border-destructive/20 m-8 text-center">Error: Failed to load resource</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild className="-ml-2">
          <Link href="/posts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Posts
          </Link>
        </Button>
      </div>

      <Card className="border-border shadow-md bg-card overflow-hidden">
        <CardHeader className="space-y-4 pb-8 border-b border-border bg-muted/30">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="font-mono text-xs bg-background border-border text-muted-foreground">
              <Hash className="w-3 h-3 mr-1" /> {post.id}
            </Badge>
            <div className="flex gap-1">
              {post.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="capitalize text-[10px]">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-4 text-xs font-medium text-muted-foreground">
              <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {post.views}</span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">👍 {post.reactions.likes}</span>
              <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400">👎 {post.reactions.dislikes}</span>
            </div>
          </div>
          <CardTitle className="text-4xl font-extrabold tracking-tight text-foreground capitalize leading-tight">
            {post.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="py-12 px-8 md:px-12">
          <p className="text-xl text-foreground/80 leading-relaxed font-medium border-l-4 border-primary/40 pl-8 py-2">
            {post.body}
          </p>
        </CardContent>

        <CardFooter className="flex flex-col items-stretch gap-8 bg-muted/10 p-8 md:p-12 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-bold tracking-tight text-foreground">Discussion</h3>
              <p className="text-sm text-muted-foreground">User comments and feedback</p>
            </div>
            
            <div className="flex gap-2">
              {!comments ? (
                <Button 
                  onClick={() => getComments()} 
                  disabled={commentsLoading}
                  className="shadow-sm"
                >
                  {commentsLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <MessageSquare className="mr-2 h-4 w-4" />}
                  Show Comments
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={() => setIsVisible(!isVisible)}
                  className="shadow-sm"
                >
                  {isVisible ? (
                    <><EyeOff className="mr-2 h-4 w-4" /> Hide Discussion</>
                  ) : (
                    <><Eye className="mr-2 h-4 w-4" /> Show Discussion ({comments.length})</>
                  )}
                </Button>
              )}
            </div>
          </div>

          {comments && isVisible && (
            <div className="grid gap-6 animate-in fade-in zoom-in-95 duration-300">
              {comments.map((comment: any) => (
  <div 
    key={comment.id} 
    className="p-6 rounded-2xl border border-border bg-card hover:bg-muted/30 transition-all shadow-sm"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold border border-primary/20">
        {/* FIX 1: Use user.username instead of email */}
        {comment.user?.username?.charAt(0).toUpperCase() || "?"}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-foreground truncate">
          {/* FIX 2: Use user.username instead of email */}
          {comment.user?.username}
        </p>
        <p className="text-xs text-muted-foreground">Posted on April 26, 2026</p>
      </div>
    </div>
    {/* FIX 3: Removed comment.name (it doesn't exist in this API) 
        and kept comment.body (which is the actual message) */}
    <p className="text-sm text-muted-foreground leading-relaxed">
      {comment.body}
    </p>
  </div>
))}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}