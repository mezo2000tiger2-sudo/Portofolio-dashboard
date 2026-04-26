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
import { Loader2, MessageSquare, Hash, UserCircle, Eye, EyeOff } from "lucide-react";

const fetchPost = async (id: string | string[]) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
};

const fetchComments = async (postId: string | string[]) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
};

export default function PostView() {
  const { id } = useParams();
  const [isVisible, setIsVisible] = useState(true); // Toggle state

  const { data: post, isLoading: postLoading, error: postError } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id as string),
    enabled: !!id,
  });

  const { 
    mutate: getComments, 
    data: comments, 
    isPending: commentsLoading 
  } = useMutation({
    mutationFn: () => fetchComments(id as string),
    onSuccess: () => setIsVisible(true), // Ensure they show up when first fetched
  });

  if (postLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (postError) return <div className="text-destructive p-6">Error loading post data.</div>;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto animate-in fade-in duration-500">
      <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
        <CardHeader className="space-y-4 pb-6 border-b bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs bg-white border-slate-300">
              <Hash className="w-3 h-3 mr-1" /> {post.id}
            </Badge>
            <Badge variant="secondary" className="font-mono text-xs text-slate-500">
              <UserCircle className="w-3 h-3 mr-1" /> Author: {post.userId}
            </Badge>
          </div>
          <CardTitle className="text-3xl font-extrabold tracking-tight text-slate-900 capitalize leading-tight">
            {post.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-8 pb-8">
          <p className="text-lg text-slate-600 leading-relaxed italic border-l-4 border-blue-500/20 pl-6">
            {post.body}
          </p>
        </CardContent>

        <CardFooter className="flex flex-col items-stretch gap-6 bg-slate-50/30 p-6 md:p-8">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Discussion</h3>
            
            <div className="flex gap-2">
              {/* Main Action Button */}
              {!comments ? (
                <Button 
                  onClick={() => getComments()} 
                  disabled={commentsLoading}
                  size="sm"
                >
                  {commentsLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <MessageSquare className="mr-2 h-4 w-4" />}
                  Fetch Comments
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsVisible(!isVisible)}
                  className="bg-white border-slate-300"
                >
                  {isVisible ? (
                    <><EyeOff className="mr-2 h-4 w-4" /> Hide</>
                  ) : (
                    <><Eye className="mr-2 h-4 w-4" /> Show ({comments.length})</>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Render Comments List with visibility check */}
          {comments && isVisible && (
            <div className="grid gap-4 animate-in zoom-in-95 duration-200">
              {comments.map((comment: any) => (
                <div 
                  key={comment.id} 
                  className="p-5 rounded-xl border border-slate-200 bg-white hover:border-blue-400/50 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-bold border border-blue-100">
                      {comment.email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 truncate max-w-[200px]">
                        {comment.email}
                      </p>
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 mb-1 leading-snug capitalize">{comment.name}</h4>
                  <p className="text-sm text-slate-500 leading-normal">{comment.body}</p>
                </div>
              ))}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}